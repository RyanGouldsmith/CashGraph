const spendings = [
  {
    title: 'A Purchase',
    person: {
      id: 1,
    },
  },
];

export const SpendingResolver = {
  spending(_, { userId }) {
    return spendings.find(spending => spending.person.id === userId);
  },
};
