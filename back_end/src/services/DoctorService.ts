import Doctor from '../models/Doctor.js';
import { BaseService } from './BaseService.js';

export class DoctorService extends BaseService<any> {
  constructor() {
    super(Doctor);
  }
  
  async findByUserId(userId: string): Promise<any | null> {
    try {
      return await Doctor.findOne({ user: userId }).exec();
    } catch (error) {
      throw error;
    }
  }
  
  async findBySpecialty(specialty: string, populate?: string | string[]): Promise<any[]> {
    try {
      let query = Doctor.find({ speciality: specialty });
      
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
}

export default new DoctorService();