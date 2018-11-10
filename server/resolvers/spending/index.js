import Mongoose from 'mongoose';
import { Spending } from '../../db/connect';

export const SpendingResolver = {
  Query: {
    spending(_, { userId, limit }) {
      return Spending.find({ userId: new Mongoose.Types.ObjectId(userId) })
        .limit(limit)
        .exec();
    },
  },
  Mutation: {
    async createSpending(_, { spending }) {
      const {
        title, price, tag, userId,
      } = spending;
      const spendingItem = new Spending({
        title,
        price,
        tag,
        userId: new Mongoose.Types.ObjectId(userId),
      });
      try {
        return await spendingItem.save();
      } catch (e) {
        throw Error(e);
      }
    },
  },
};
