import Patient from '../models/Patient.js';
import { BaseService } from './BaseService.js';

export class PatientService extends BaseService<any> {
  constructor() {
    super(Patient);
  }
  
  async findByUserId(userId: string): Promise<any | null> {
    try {
      return await Patient.findOne({ user: userId }).exec();
    } catch (error) {
      throw error;
    }
  }
}

export default new PatientService();