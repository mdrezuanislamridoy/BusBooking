import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { authMiddleware } from '../../middlewares/auth';

const router = Router();

router.post('/create', authMiddleware, PaymentController.createPayment);
router.post('/confirm', authMiddleware, PaymentController.confirmPayment);

export const PaymentRoutes = router;
