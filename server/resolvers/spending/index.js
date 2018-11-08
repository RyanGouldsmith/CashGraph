import Mongoose from 'mongoose';
import { Spending } from '../../db/connect';

const spendings = [
  {
    title: 'Shoes on Holiday',
    price: 10.99,
    tag: {
      name: 'TRAVEL',
      colour: 'GREEN',
    },
    person: {
      id: 1,
    },
  },
  {
    title: 'Food on Holiday',
    price: 15.99,
    tag: {
      name: 'TRAVEL',
      colour: 'GREEN',
    },
    person: {
      id: 1,
    },
  },
  {
    title: 'Hotel on Holiday',
    price: 100.99,
    tag: {
      name: 'TRAVEL',
      colour: 'GREEN',
    },
    person: {
      id: 1,
    },
  },
  {
    title: 'Snooker',
    price: 10.99,
    tag: {
      name: 'ENTERTAINMENT',
      colour: 'RED',
    },
    person: {
      id: 1,
    },
  },
];

export const SpendingResolver = {
  spending(_, { userId, limit }) {
    return Spending.find({ userId: new Mongoose.Types.ObjectId(userId) })
      .limit(limit)
      .exec();
  },
};
