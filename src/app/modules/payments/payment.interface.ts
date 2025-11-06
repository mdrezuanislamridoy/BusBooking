import { Types } from 'mongoose';

export interface IPaymentModule {
  createPayment: {
    amount: number; // amount in smallest currency unit
    bookingId: Types.ObjectId | string; // reference to Course
  };
  paymentRecord: {
    bookingId: Types.ObjectId | string; // reference to Course
    userId: Types.ObjectId | string; // reference to User
    amount: number;
    currency: string;
    status: 'pending' | 'succeeded' | 'failed';
    paymentIntentId: string;
  };
  confirmPayment: {
    paymentIntentId: string;
  };
}
