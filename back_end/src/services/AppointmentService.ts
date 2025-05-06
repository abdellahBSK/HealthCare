import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import HealthCondition from '../models/HealthCondition.js';
import { BaseService } from './BaseService.js';

export class AppointmentService extends BaseService<any> {
  constructor() {
    super(Appointment);
  }
  
  async findByPatient(patientId: string, populate?: string | string[]): Promise<any[]> {
    try {
      let query = Appointment.find({ patient: patientId });
      
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(field => {
            query = query.populate(field);
          });
        } else {
          query = query.populate(populate);
        }
      }
      
      return await query.exec();
    } catch (error) {
      throw error;
    }
  }
  
  async findByDoctor(doctorId: string, populate?: string | string[]): Promise<any[]> {
    try {
      let query = Appointment.find({ doctor: doctorId });
      
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(field => {
            query = query.populate(field);
          });
        } else {
          query = query.populate(populate);
        }
      }
      
      return await query.exec();
    } catch (error) {
      throw error;
    }
  }
  
  async getHealthCategories(): Promise<any[]> {
    try {
      return await HealthCondition.aggregate([
        { $group: { _id: "$category" } },
        { $project: { _id: 0, name: "$_id" } },
        { $sort: { name: 1 } }
      ]);
    } catch (error) {
      throw error;
    }
  }
  
  async checkSlotAvailability(doctorId: string, date: Date, startTime: string, endTime: string): Promise<boolean> {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) return false;
      
      const existingAppointments = await Appointment.find({
        doctor: doctor.user,
        date: { $gte: startOfDay, $lte: endOfDay },
        status: { $nin: ['cancelled', 'no-show'] }
      });
      
      // Convert times to minutes for easier comparison
      const convertTimeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };
      
      const newStart = convertTimeToMinutes(startTime);
      const newEnd = convertTimeToMinutes(endTime);
      
      // Check for overlap with existing appointments
      for (const appointment of existingAppointments) {
        const apptStart = convertTimeToMinutes(appointment.startTime);
        const apptEnd = convertTimeToMinutes(appointment.endTime);
        
        if ((newStart >= apptStart && newStart < apptEnd) || 
            (newEnd > apptStart && newEnd <= apptEnd) ||
            (newStart <= apptStart && newEnd >= apptEnd)) {
          return false;
        }
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }
  
  async getAvailableSlotsForDay(doctorId: string, date: Date, startTime: string, endTime: string): Promise<any[]> {
    try {
      // Convert times to minutes for easier calculation
      const convertTimeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };
      
      const formatTimeToAmPm = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
      };
      
      const start = convertTimeToMinutes(startTime);
      const end = convertTimeToMinutes(endTime);
      
      // Get existing appointments for this day
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      const doctor = await Doctor.findById(doctorId);
      if (!doctor) return [];
      
      const existingAppointments = await Appointment.find({
        doctor: doctor.user,
        date: { $gte: startOfDay, $lte: endOfDay },
        status: { $nin: ['cancelled', 'no-show'] }
      });
      
      // Create 30-minute slots
      const slots = [];
      const SLOT_DURATION = 30; // in minutes
      
      for (let i = start; i < end; i += SLOT_DURATION) {
        const slotStart = `${Math.floor(i / 60).toString().padStart(2, '0')}:${(i % 60).toString().padStart(2, '0')}`;
        const slotEnd = `${Math.floor((i + SLOT_DURATION) / 60).toString().padStart(2, '0')}:${((i + SLOT_DURATION) % 60).toString().padStart(2, '0')}`;
        
        // Check if this slot is already booked
        const isBooked = existingAppointments.some(appointment => {
          const apptStart = convertTimeToMinutes(appointment.startTime);
          const apptEnd = convertTimeToMinutes(appointment.endTime);
          return (i >= apptStart && i < apptEnd) ||
                 (i + SLOT_DURATION > apptStart && i + SLOT_DURATION <= apptEnd) ||
                 (i <= apptStart && i + SLOT_DURATION >= apptEnd);
        });
        
        if (!isBooked) {
          slots.push({
            start: slotStart,
            end: slotEnd,
            formattedStart: formatTimeToAmPm(slotStart),
            duration: SLOT_DURATION
          });
        }
      }
      
      return slots;
    } catch (error) {
      throw error;
    }
  }
}

export default new AppointmentService();