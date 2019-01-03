import Mongoose from 'mongoose';
import { Tag } from '../../db/connect';

export const TagResolver = {
  tags(_, { userId }) {
    return Tag.find({ userId: new Mongoose.Types.ObjectId(userId) });
  },
  tag(_, { name, userId }) {
    return Tag.findOne({ userId: new Mongoose.Types.ObjectId(userId), name });
  },
};
