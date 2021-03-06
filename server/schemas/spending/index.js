export const Spending = `
  type Spending {
    id: String
    title: String
    price: Float
    tag: [Tag],
    userId: String!,
    createdAt: Date
  }
`;

export const SpendingItemsByDateInput = `
  input SpendingItemsByDateInput {
    userId: String!
    startDate: Date!
    endDate: Date!
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

export const EditSpendingInput = `
  input EditSpendingInput {
    id: String!,
    title: String
    price: Float
    tag: TagInput
    userId: String!
  }
`;

export const DeleteSpendingInput = `
  input DeleteSpendingInput {
    id: String!
    userId: String!
  }
`;

export const SpendingItemInput = `
  input SpendingItemInput {
    id: String!
    userId: String!
  }
`;
