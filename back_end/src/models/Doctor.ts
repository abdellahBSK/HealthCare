import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  speciality: { type: String, required: true },
  professionalLicenseNumber: { type: String, required: true, unique: true },
  biography: String,
  education: [{
    institution: String,
    degree: String,
    year: Number
  }],
  experience: [{
    position: String,
    institution: String,
    startYear: Number,
    endYear: Number
  }],
  languages: [String],
  consultationFee: Number,
  availabilitySchedule: [{
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    startTime: String,
    endTime: String,
    isAvailable: Boolean
  }],
  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
});

export default mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);