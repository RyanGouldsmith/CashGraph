import { User } from '../../db/connect';

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
  },
};
