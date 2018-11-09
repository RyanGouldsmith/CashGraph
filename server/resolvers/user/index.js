import { User } from '../../db/connect';

export const UserResolver = {
  users() {
    return User.find({}).exec();
  },
  user(_, { id }) {
    return User.findById(id).exec();
  },
};
