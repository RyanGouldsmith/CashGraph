import Mongoose from 'mongoose';
import { Spending } from '../../db/connect';

export const SpendingResolver = {
  Query: {
    spending(_, { userId, limit }) {
      return Spending.find({ userId: new Mongoose.Types.ObjectId(userId) })
        .sort({
          _id: -1,
        })
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
    async deleteAllSpending(_, { userId }) {
      await Spending.deleteMany({ userId: new Mongoose.Types.ObjectId(userId) });
    },
  },
};
