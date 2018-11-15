export const User = `
  type User {
    id: ID!
    name: String
    email: String
  }
`;

export const UserInput = `
  input UserInput {
    name: String,
    email: String
  }
`;

export const UserUpdateInput = `
  input UserUpdateInput {
    id: ID!
    name: String
    email: String
  }
`;
