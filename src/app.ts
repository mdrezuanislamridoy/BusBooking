import dotenv from 'dotenv';
dotenv.config(); // <-- must be at top

import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import { UserRoutes } from './app/modules/user/user.route';
import { StudentRoutes } from './app/modules/student/student.route';
import { MentorRoutes } from './app/modules/mentor/mentor.routes';
import { CourseRoutes } from './app/modules/courses/course.routes';
import { CategoryRoutes } from './app/modules/courseCategory/courseCategory.routes';
import { AuthRoutes } from './app/modules/auth/auth.routes';
import { PaymentRoutes } from './app/modules/payments/payment.routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/user', UserRoutes);
app.use('/api/auth', AuthRoutes);
app.use('/api/students', StudentRoutes);
app.use('/api/mentors', MentorRoutes);
app.use('/api/courses', CourseRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/payments', PaymentRoutes);

// health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running successfully' });
});

// global error handler
app.use(globalErrorHandler);

export default app;
