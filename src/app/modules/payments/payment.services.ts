// src/app/modules/payments/payment.service.ts
import Stripe from 'stripe';
import { Payment } from './payment.model';
import { IPaymentModule } from './payment.interface';

// Stripe initialization
// Use latest TypeScript-compatible API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

export class PaymentService {
  /**
   * Create a Stripe PaymentIntent and store payment record in DB
   * @param amount number (in cents)
   * @param userId string (MongoDB ObjectId)
   * @param courseId string (MongoDB ObjectId)
   * @returns client_secret string
   */
  static async createPaymentIntent(
    amount: number,
    userId: string,
    bookingId: string,
  ) {
    // Create PaymentIntent on Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    // Save payment record in MongoDB
    await Payment.create({
      bookingId,
      userId,
      amount,
      currency: 'usd',
      status: 'pending',
      paymentIntentId: paymentIntent.id,
    } as IPaymentModule['paymentRecord']);

    return paymentIntent.client_secret;
  }

  /**
   * Confirm a Stripe PaymentIntent and update payment status in DB
   * @param paymentIntentId string
   * @returns status string
   */
  static async confirmPayment(paymentIntentId: string) {
    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Update payment status in MongoDB
    await Payment.findOneAndUpdate(
      { paymentIntentId },
      { status: paymentIntent.status },
      { new: true },
    );

    return paymentIntent.status;
  }
}
