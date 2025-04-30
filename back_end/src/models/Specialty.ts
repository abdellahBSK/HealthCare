import mongoose from 'mongoose';

const specialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    icon: String,
    commonConditions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HealthCondition'
    }]
});

export default mongoose.models.Specialty ||
mongoose.model('Specialty', specialtySchema);