import Mongoose from 'mongoose';

export const UserSchema = Mongoose.Schema({
  name: String,
  email: String,
});
