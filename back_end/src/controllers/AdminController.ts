import { Request, Response } from 'express';
import User from '../models/User';
import Doctor from '../models/Doctor';
import Appointment from '../models/Appointment';
import Payment from '../models/Payment';

// Obtenir les statistiques du tableau de bord
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Compter le nombre total d'utilisateurs
    const totalUsers = await User.countDocuments();
    
    // Compter le nombre de médecins vérifiés
    const verifiedDoctors = await Doctor.countDocuments({ isVerified: true });
    
    // Compter le nombre total de rendez-vous
    const totalAppointments = await Appointment.countDocuments();
    
    // Calculer le revenu total (si vous avez un modèle Payment)
    const revenue = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    
    // Calculer les tendances (% d'augmentation par rapport au mois précédent)
    // Ceci est une implémentation simplifiée, vous devrez l'adapter à vos besoins
    const userTrend = "+12%";  // À remplacer par un calcul réel
    const doctorTrend = "+7%";  // À remplacer par un calcul réel
    const appointmentTrend = "+23%";  // À remplacer par un calcul réel
    const revenueTrend = "+18%";  // À remplacer par un calcul réel
    
    return res.status(200).json({
      stats: {
        totalUsers: {
          value: totalUsers,
          trend: userTrend
        },
        verifiedDoctors: {
          value: verifiedDoctors,
          trend: doctorTrend
        },
        totalAppointments: {
          value: totalAppointments,
          trend: appointmentTrend
        },
        revenue: {
          value: revenue.length > 0 ? revenue[0].total : 0,
          trend: revenueTrend
        }
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir les utilisateurs récents
export const getRecentUsers = async (req: Request, res: Response) => {
  try {
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email profileImage role createdAt');
    
    return res.status(200).json(recentUsers);
  } catch (error) {
    console.error('Error fetching recent users:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir les rendez-vous récents
export const getRecentAppointments = async (req: Request, res: Response) => {
  try {
    const recentAppointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('patient', 'firstName lastName profileImage')
      .populate('doctor', 'firstName lastName speciality');
    
    return res.status(200).json(recentAppointments);
  } catch (error) {
    console.error('Error fetching recent appointments:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir les données du graphique de revenus
export const getRevenueData = async (req: Request, res: Response) => {
  try {
    // Obtenir les données des 6 derniers mois
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const revenueData = await Payment.aggregate([
      { 
        $match: { 
          createdAt: { $gte: sixMonthsAgo } 
        } 
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" }, 
            month: { $month: "$createdAt" } 
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    
    // Formater les données pour le graphique
    const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    const formattedData = revenueData.map(item => ({
      month: months[item._id.month - 1],
      revenue: item.total
    }));
    
    return res.status(200).json(formattedData);
  } catch (error) {
    console.error('Error fetching revenue data:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Vérifier un médecin
export const verifyDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Médecin non trouvé' });
    }
    
    doctor.isVerified = true;
    doctor.verificationDate = new Date();
    await doctor.save();
    
    return res.status(200).json({ 
      message: 'Médecin vérifié avec succès',
      doctor
    });
  } catch (error) {
    console.error('Error verifying doctor:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Rejeter un médecin
export const rejectDoctor = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const { reason } = req.body;
    
    if (!reason) {
      return res.status(400).json({ message: 'Une raison de rejet est requise' });
    }
    
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Médecin non trouvé' });
    }
    
    doctor.isVerified = false;
    doctor.rejectionReason = reason;
    doctor.rejectionDate = new Date();
    await doctor.save();
    
    return res.status(200).json({ 
      message: 'Médecin rejeté',
      doctor
    });
  } catch (error) {
    console.error('Error rejecting doctor:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir les médecins en attente de vérification
export const getPendingDoctors = async (req: Request, res: Response) => {
  try {
    const pendingDoctors = await Doctor.find({ 
      isVerified: false,
      rejectionReason: { $exists: false }
    })
    .populate('user', 'firstName lastName email profileImage')
    .sort({ createdAt: -1 });
    
    return res.status(200).json(pendingDoctors);
  } catch (error) {
    console.error('Error fetching pending doctors:', error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};