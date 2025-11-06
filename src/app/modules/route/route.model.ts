import { IRoueInterface } from './route.interface';
import { model, Schema } from 'mongoose';

const routeSchema = new Schema<IRoueInterface>({
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
});

export const Route = model('Route', routeSchema);
