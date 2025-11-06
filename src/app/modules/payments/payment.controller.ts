import { Request, Response } from 'express';

import { createPaymentSchema, confirmPaymentSchema } from './payment.validation';
import { IPaymentModule } from './payment.interface';
import { PaymentService } from './payment.services';

export class PaymentController {
  static async createPayment(req: Request, res: Response) {
    const parseResult = createPaymentSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.errors });
    }

    const { amount, bookingId }: IPaymentModule['createPayment'] = parseResult.data;
    const userId = (req as any).user._id;

    try {
      const clientSecret = await PaymentService.createPaymentIntent(amount, userId, bookingId);
      res.status(200).json({ success: true, clientSecret });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }

  static async confirmPayment(req: Request, res: Response) {
    const parseResult = confirmPaymentSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ success: false, errors: parseResult.error.errors });
    }

    const { paymentIntentId }: IPaymentModule['confirmPayment'] = parseResult.data;

    try {
      const status = await PaymentService.confirmPayment(paymentIntentId);
      res.status(200).json({ success: true, status });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
