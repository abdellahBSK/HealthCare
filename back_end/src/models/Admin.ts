import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IAdmin extends Document {
  user: IUser['_id'];
  role: string;
  permissions: string[];
  lastLogin: Date;
}

const AdminSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['super', 'manager', 'support'],
    default: 'manager'
  },
  permissions: [{
    type: String,
    enum: ['manage_users', 'manage_doctors', 'manage_appointments', 'view_analytics', 'manage_content']
  }],
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model<IAdmin>('Admin', AdminSchema);