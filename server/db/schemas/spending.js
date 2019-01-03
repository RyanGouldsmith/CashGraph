import Mongoose from 'mongoose';

export const SpendingSchema = new Mongoose.Schema({
  title: String,
  price: Number,
  tag: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Tag',
    },
  ],
  userId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: Date,
});
