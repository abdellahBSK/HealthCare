import mongoose from 'mongoose';
const patientSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicalHistory: String,
    allergies: [String],
    currentMedications: [String],
    emergencyContact: {
        name: String,
        relationship: String,
        phoneNumber: String
    }
});
export default mongoose.models.Patient || mongoose.model('Patient', patientSchema);
