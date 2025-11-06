import { Document } from 'mongoose';

export interface IRoueInterface extends Document {
  origin: string;
  destination: string;
  distance: number;
}
