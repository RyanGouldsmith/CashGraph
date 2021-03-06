import Mongoose from 'mongoose';
import { Spending } from '../../db/connect';

export const SpendingResolver = {
  Query: {
    spending(_, { userId, limit }) {
      return Spending.find({ userId: new Mongoose.Types.ObjectId(userId) })
        .populate('tag')
        .sort({
          _id: -1,
        })
        .limit(limit)
        .exec();
    },
    getSpendingItem(_, { spending }) {
      const { id, userId } = spending;
      return Spending.findOne({
        _id: new Mongoose.Types.ObjectId(id),
        userId: new Mongoose.Types.ObjectId(userId),
      }).populate('tag');
    },
    getSpendingItemsByDate(_, { spending }) {
      const { userId, startDate, endDate } = spending;
      return Spending.find({
        userId: new Mongoose.Types.ObjectId(userId),
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      }).populate('tag');
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
        tag: [new Mongoose.Types.ObjectId(tag.id)],
        userId: new Mongoose.Types.ObjectId(userId),
        createdAt: new Date(),
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
    async deleteAllSpendingByDate(_, { spending }) {
      const { userId, startDate, endDate } = spending;
      const response = await Spending.deleteMany({
        userId: new Mongoose.Types.ObjectId(userId),
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      });

      return response !== null;
    },
    async deleteSpending(_, { spending }) {
      const { id, userId } = spending;
      const response = await Spending.findOneAndDelete({
        _id: new Mongoose.Types.ObjectId(id),
        userId: new Mongoose.Types.ObjectId(userId),
      });

      return response !== null;
    },
    editSpending(_, { spending }) {
      const {
        id, title, price, tag, userId,
      } = spending;
      let updatedSpendingDetails = {
        createdAt: new Date(),
      };

      if (title) {
        updatedSpendingDetails = { ...updatedSpendingDetails, title };
      }

      if (price) {
        updatedSpendingDetails = { ...updatedSpendingDetails, price };
      }

      if (tag) {
        updatedSpendingDetails = {
          ...updatedSpendingDetails,
          tag: [new Mongoose.Types.ObjectId(tag.id)],
        };
      }

      return Spending.findOneAndUpdate(
        {
          _id: new Mongoose.Types.ObjectId(id),
          userId: new Mongoose.Types.ObjectId(userId),
        },
        updatedSpendingDetails,
        {
          new: true,
        },
      ).populate('tag');
    },
  },
};
