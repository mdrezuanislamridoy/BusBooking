import { Schema, model } from 'mongoose';
import { IPaymentModule } from './payment.interface';

const paymentSchema = new Schema<IPaymentModule['paymentRecord']>(
  {
    bookingId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    status: { type: String, required: true },
    paymentIntentId: { type: String, required: true },
  },
  { timestamps: true },
);

export const Payment = model<IPaymentModule['paymentRecord']>('Payment', paymentSchema);
