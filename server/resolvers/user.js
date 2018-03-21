const users = [
  {
    name: 'user 1',
    email: 'user@user.uk',
  },
  {
    name: 'user 2',
    email: 'user2@user.uk',
  },
];

export const UserResolver = {
  users() {
    return users;
  },
  user(_, { email }) {
    return users.find(user => user.email === email);
  },
};
