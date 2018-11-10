export const Spending = `
  type Spending {
    title: String
    price: Float
    tag: Tag,
    userId: String!
  }
`;

export const SpendingInput = `
  input SpendingInput {
    title: String!
    price: Float!
    tag: TagInput!
    userId: String!
  }
`;
