import Mongoose from 'mongoose';
import { SpendingSchema } from './schemas/spending';
import { UserSchema } from './schemas/user';
import { TagSchema } from './schemas/tag';

const { HOSTNAME, PORT, DB } = process.env;

export function connectDatabase() {
  Mongoose.connect(`mongodb://${HOSTNAME}:${PORT}/${DB}`);
  Mongoose.connection.on('connected', () => console.log('connected'));
  Mongoose.connection.on('error', error => console.log('error', error));
}

export const Spending = Mongoose.model('Spending', SpendingSchema, 'spending');
export const User = Mongoose.model('User', UserSchema, 'users');
export const Tag = Mongoose.model('Tag', TagSchema, 'tags');
