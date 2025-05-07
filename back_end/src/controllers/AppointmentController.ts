import { Request, Response } from "express";
import HealthCondition from "../models/HealthCondition";
import Speciality from "../models/Speciality";
import Doctor from "../models/Doctor";
import User from "../models/User";
import Appointment from "../models/Appointment";

// Obtenir toutes les catégories de santé
export const getHealthCategories = async (req: Request, res: Response) => {
  try {
    // Obtenir uniquement les catégories distinctes
    const categories = await HealthCondition.aggregate([
      { $group: { _id: "$category" } },
      { $project: { _id: 0, name: "$_id" } },
      { $sort: { name: 1 } },
    ]);

    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching health categories:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Obtenir les conditions de santé par catégorie
export const getHealthConditions = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    let query = {};
    if (category) {
      query = { category };
    }

    const conditions = await HealthCondition.find(query).sort({ name: 1 });
    return res.status(200).json(conditions);
  } catch (error) {
    console.error("Error fetching health conditions:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Obtenir les spécialités recommandées pour des conditions spécifiques
export const getSpecialistsForConditions = async (
  req: Request,
  res: Response
) => {
  try {
    const { conditions } = req.query;

    if (!conditions) {
      return res
        .status(400)
        .json({ message: "Conditions parameter is required" });
    }

    const conditionIds = Array.isArray(conditions) ? conditions : [conditions];

    // Trouver les conditions de santé
    const healthConditions = await HealthCondition.find({
      _id: { $in: conditionIds },
    });

    // Extraire toutes les spécialités associées
    const specialityNames = new Set<string>();
    healthConditions.forEach((condition) => {
      if (condition.specialties && condition.specialties.length > 0) {
        condition.specialties.forEach((spec) => specialityNames.add(spec));
      }
    });

    // Trouver les spécialités
    const specialties = await Speciality.find({
      name: { $in: Array.from(specialityNames) },
    });

    // Créer un tableau de recommandations
    const recommendations = specialties.map((speciality) => {
      // Calculer combien de conditions sont traitées par cette spécialité
      const matchedConditions = healthConditions.filter((condition) =>
        condition.specialties.includes(speciality.name)
      ).length;

      return {
        _id: speciality._id,
        name: speciality.name,
        description: speciality.description,
        icon: speciality.icon,
        matchedConditionsCount: matchedConditions,
        totalConditionsCount: conditionIds.length,
      };
    });

    // Trier par nombre de conditions correspondantes (descendant)
    recommendations.sort(
      (a, b) => b.matchedConditionsCount - a.matchedConditionsCount
    );

    return res.status(200).json(recommendations);
  } catch (error) {
    console.error("Error getting specialists for conditions:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Obtenir les médecins par spécialité
export const getDoctorsBySpeciality = async (req: Request, res: Response) => {
  try {
    const { speciality, sort } = req.query;

    if (!speciality) {
      return res
        .status(400)
        .json({ message: "Speciality parameter is required" });
    }

    // Trouver les médecins par spécialité
    const doctors = await Doctor.find({ speciality: speciality }).populate(
      "user",
      "firstName lastName profileImage"
    );

    // Formater les résultats
    const formattedDoctors = await Promise.all(
      doctors.map(async (doctor) => {
        // Calculer la prochaine disponibilité
        const nextAvailability = await getNextAvailability(doctor._id);

        return {
          _id: doctor._id,
          user: doctor.user,
          speciality: doctor.speciality,
          averageRating: doctor.averageRating,
          reviewsCount: doctor.reviewsCount,
          consultationFee: doctor.consultationFee,
          experience: doctor.experience
            ? Math.max(
                ...doctor.experience.map((exp) => exp.endYear - exp.startYear)
              )
            : 0,
          nextAvailability: nextAvailability,
          languages: doctor.languages,
        };
      })
    );

    // Trier les résultats
    let sortedDoctors = [...formattedDoctors];

    if (sort === "rating") {
      sortedDoctors.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sort === "availability") {
      sortedDoctors.sort((a, b) => {
        if (!a.nextAvailability) return 1;
        if (!b.nextAvailability) return -1;
        return (
          new Date(a.nextAvailability.date).getTime() -
          new Date(b.nextAvailability.date).getTime()
        );
      });
    }

    return res.status(200).json(sortedDoctors);
  } catch (error) {
    console.error("Error getting doctors by speciality:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Obtenir les disponibilités d'un médecin
export const getDoctorAvailability = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    // Trouver le médecin
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Si une date est fournie, obtenir les disponibilités pour cette date
    // Sinon, obtenir les disponibilités pour les 7 prochains jours
    let startDate, endDate;

    if (date) {
      startDate = new Date(date as string);
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
    } else {
      startDate = new Date();
      endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
    }

    // Obtenir les disponibilités
    const availabilityDays = await generateAvailabilityForDateRange(
      doctorId,
      startDate,
      endDate,
      doctor.availabilitySchedule
    );

    return res.status(200).json(availabilityDays);
  } catch (error) {
    console.error("Error getting doctor availability:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Créer un rendez-vous
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { doctorId, date, startTime, endTime, conditionIds, notes } =
      req.body;

    // Valider les données
    if (!doctorId || !date || !startTime || !endTime) {
      return res.status(400).json({
        message: "Doctor ID, date, start time and end time are required",
      });
    }

    // Vérifier si le médecin existe
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Vérifier si le créneau est disponible
    const isAvailable = await checkSlotAvailability(
      doctorId,
      new Date(date),
      startTime,
      endTime
    );

    if (!isAvailable) {
      return res
        .status(400)
        .json({ message: "This time slot is not available" });
    }

    // Extraire les raisons de la visite à partir des conditions
    let reason = { name: "", reasonType: "physic" };

    if (conditionIds && conditionIds.length > 0) {
      const conditions = await HealthCondition.find({
        _id: { $in: conditionIds },
      });

      if (conditions.length > 0) {
        // Utiliser le premier comme raison principale
        reason.name = conditions[0].name;
        reason.reasonType =
          conditions[0].category === "Mental Health" ? "mental" : "physic";
      }
    }

    // Créer le rendez-vous
    const appointment = new Appointment({
      patient: req.user._id, // L'ID utilisateur du patient à partir du middleware d'authentification
      doctor: doctor.user._id, // L'ID utilisateur du médecin (pas l'ID du docteur)
      date: new Date(date),
      startTime,
      endTime,
      status: "scheduled",
      reason,
      notes: notes ? [notes] : [],
      payment: {
        amount: doctor.consultationFee,
        status: "pending",
      },
    });

    const savedAppointment = await appointment.save();

    return res.status(201).json(savedAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Obtenir les détails d'un rendez-vous
export const getAppointmentDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate("patient", "firstName lastName email profileImage")
      .populate("doctor", "firstName lastName email profileImage");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Vérifier que l'utilisateur est autorisé à accéder à ce rendez-vous
    if (
      appointment.patient._id.toString() !== req.user._id.toString() &&
      appointment.doctor._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this appointment" });
    }

    return res.status(200).json(appointment);
  } catch (error) {
    console.error("Error getting appointment details:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Annuler un rendez-vous
export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Vérifier que l'utilisateur est autorisé à annuler ce rendez-vous
    if (
      appointment.patient.toString() !== req.user._id.toString() &&
      appointment.doctor.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this appointment" });
    }

    // Vérifier que le rendez-vous peut être annulé
    if (["completed", "cancelled", "no-show"].includes(appointment.status)) {
      return res.status(400).json({
        message: `Cannot cancel an appointment with status: ${appointment.status}`,
      });
    }

    // Mettre à jour le statut et ajouter une note si fournie
    appointment.status = "cancelled";
    if (reason) {
      appointment.notes.push(`Cancelled: ${reason}`);
    }

    const updatedAppointment = await appointment.save();

    return res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Fonction utilitaire pour obtenir la prochaine disponibilité d'un médecin
const getNextAvailability = async (doctorId) => {
  try {
    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.availabilitySchedule) {
      return null;
    }

    // Générer les disponibilités pour les 7 prochains jours
    const availabilityDays = await generateAvailabilityForDateRange(
      doctorId,
      today,
      oneWeekLater,
      doctor.availabilitySchedule
    );

    // Trouver le premier jour avec des créneaux disponibles
    for (const day of availabilityDays) {
      if (day.slots && day.slots.length > 0) {
        return {
          date: day.date,
          day: day.day,
          firstAvailableSlot: day.slots[0],
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error getting next availability:", error);
    return null;
  }
};

// Fonction utilitaire pour générer les disponibilités pour une plage de dates
const generateAvailabilityForDateRange = async (
  doctorId,
  startDate,
  endDate,
  availabilitySchedule
) => {
  // Tableau pour stocker les résultats
  const availabilityDays = [];

  // Parcourir chaque jour dans la plage
  const currentDate = new Date(startDate);
  while (currentDate < endDate) {
    // Obtenir le jour de la semaine (0 = dimanche, 1 = lundi, etc.)
    const dayOfWeek = currentDate.getDay();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[dayOfWeek];

    // Trouver la disponibilité pour ce jour dans l'emploi du temps du médecin
    const daySchedule = availabilitySchedule.find(
      (schedule) => schedule.day === dayName && schedule.isAvailable
    );

    if (daySchedule) {
      // Ce jour est disponible dans l'emploi du temps du médecin
      // Obtenir les créneaux disponibles en tenant compte des rendez-vous existants
      const availableSlots = await getAvailableSlotsForDay(
        doctorId,
        new Date(currentDate),
        daySchedule.startTime,
        daySchedule.endTime
      );

      availabilityDays.push({
        date: new Date(currentDate),
        day: dayName,
        slots: availableSlots,
      });
    } else {
      // Ce jour n'est pas disponible dans l'emploi du temps du médecin
      availabilityDays.push({
        date: new Date(currentDate),
        day: dayName,
        slots: [],
      });
    }

    // Passer au jour suivant
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return availabilityDays;
};

// Fonction utilitaire pour obtenir les créneaux disponibles pour un jour
const getAvailableSlotsForDay = async (doctorId, date, startTime, endTime) => {
  try {
    // Convertir les heures en minutes depuis minuit
    const convertTimeToMinutes = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const start = convertTimeToMinutes(startTime);
    const end = convertTimeToMinutes(endTime);

    // Obtenir les rendez-vous existants pour ce jour
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const doctor = await Doctor.findById(doctorId);

    const existingAppointments = await Appointment.find({
      doctor: doctor.user, // L'ID utilisateur du médecin
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $nin: ["cancelled", "no-show"] },
    });

    // Créer des créneaux de 30 minutes
    const slots = [];
    const SLOT_DURATION = 30; // en minutes

    for (let i = start; i < end; i += SLOT_DURATION) {
      const slotStart = `${Math.floor(i / 60)
        .toString()
        .padStart(2, "0")}:${(i % 60).toString().padStart(2, "0")}`;
      const slotEnd = `${Math.floor((i + SLOT_DURATION) / 60)
        .toString()
        .padStart(2, "0")}:${((i + SLOT_DURATION) % 60)
        .toString()
        .padStart(2, "0")}`;

      // Vérifier si ce créneau est déjà réservé
      const isBooked = existingAppointments.some((appointment) => {
        const apptStart = convertTimeToMinutes(appointment.startTime);
        const apptEnd = convertTimeToMinutes(appointment.endTime);
        return (
          (i >= apptStart && i < apptEnd) ||
          (i + SLOT_DURATION > apptStart && i + SLOT_DURATION <= apptEnd) ||
          (i <= apptStart && i + SLOT_DURATION >= apptEnd)
        );
      });

      if (!isBooked) {
        slots.push({
          start: slotStart,
          end: slotEnd,
          formattedStart: formatTimeToAmPm(slotStart),
          duration: SLOT_DURATION,
        });
      }
    }

    return slots;
  } catch (error) {
    console.error("Error getting available slots:", error);
    return [];
  }
};

// Fonction utilitaire pour vérifier la disponibilité d'un créneau
const checkSlotAvailability = async (doctorId, date, startTime, endTime) => {
  try {
    // Obtenir le jour de la semaine
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = dayNames[date.getDay()];

    // Vérifier si le médecin est disponible ce jour-là
    const doctor = await Doctor.findById(doctorId);
    const daySchedule = doctor.availabilitySchedule.find(
      (schedule) => schedule.day === dayName && schedule.isAvailable
    );

    if (!daySchedule) {
      return false; // Le médecin n'est pas disponible ce jour-là
    }

    // Convertir les heures en minutes
    const convertTimeToMinutes = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const scheduleStart = convertTimeToMinutes(daySchedule.startTime);
    const scheduleEnd = convertTimeToMinutes(daySchedule.endTime);
    const slotStart = convertTimeToMinutes(startTime);
    const slotEnd = convertTimeToMinutes(endTime);

    // Vérifier si le créneau est dans l'horaire du médecin
    if (slotStart < scheduleStart || slotEnd > scheduleEnd) {
      return false; // Le créneau n'est pas dans l'horaire du médecin
    }

    // Obtenir les rendez-vous existants pour ce jour
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await Appointment.find({
      doctor: doctor.user, // L'ID utilisateur du médecin
      date: { $gte: startOfDay, $lte: endOfDay },
      status: { $nin: ["cancelled", "no-show"] },
    });

    // Vérifier si le créneau est déjà réservé
    const isBooked = existingAppointments.some((appointment) => {
      const apptStart = convertTimeToMinutes(appointment.startTime);
      const apptEnd = convertTimeToMinutes(appointment.endTime);
      return (
        (slotStart >= apptStart && slotStart < apptEnd) ||
        (slotEnd > apptStart && slotEnd <= apptEnd) ||
        (slotStart <= apptStart && slotEnd >= apptEnd)
      );
    });

    return !isBooked;
  } catch (error) {
    console.error("Error checking slot availability:", error);
    return false;
  }
};

// Fonction utilitaire pour formater l'heure en format AM/PM
const formatTimeToAmPm = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${hour12}:${minutes.toString().padStart(2, "0")} ${period}`;
};
