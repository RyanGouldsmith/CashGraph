import Mongoose from 'mongoose';
import { SpendingSchema } from './schemas/spending';
import { UserSchema } from './schemas/user';

const { HOSTNAME, PORT, DB } = process.env;

export function connectDatabase() {
  Mongoose.connect(`mongodb://${HOSTNAME}:${PORT}/${DB}`);
  Mongoose.connection.on('connected', () => console.log('connected'));
  Mongoose.connection.on('error', () => console.log('error'));
}

export const Spending = Mongoose.model('Spending', SpendingSchema, 'spending');
export const User = Mongoose.model('User', UserSchema, 'user');
