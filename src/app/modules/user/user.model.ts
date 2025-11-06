import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPasswordChanged: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'blocked', 'pending'],
      default: 'pending',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// 👇👇👇 Just this block added 👇👇👇
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User = model<IUser>('User', userSchema);
