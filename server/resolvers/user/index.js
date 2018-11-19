import Mongoose from 'mongoose';

import { User } from '../../db/connect';

import { SpendingResolver } from '../spending';

export const UserResolver = {
  Query: {
    users() {
      return User.find({}).exec();
    },
    user(_, { id }) {
      return User.findById(id).exec();
    },
  },
  Mutation: {
    async createUser(_, { user }) {
      const { name, email } = user;
      const newUser = new User({
        name,
        email,
      });
      try {
        return await newUser.save();
      } catch (e) {
        throw Error(e);
      }
    },
    updateUser(_, { user }) {
      const { id, name, email } = user;
      let updatedUserDetails = {};

      if (name) {
        updatedUserDetails = { ...updatedUserDetails, name };
      }

      if (email) {
        updatedUserDetails = { ...updatedUserDetails, email };
      }

      return User.findOneAndUpdate(new Mongoose.Types.ObjectId(id), updatedUserDetails, {
        new: true,
      });
    },
    async deleteUser(_, { id }) {
      await User.findByIdAndDelete(id).exec();
      await SpendingResolver.Mutation.deleteAllSpending(_, { userId: id });
    },
  },
};
