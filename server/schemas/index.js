import { User, UserInput, UserUpdateInput } from './user';
import {
  Tag, AllowedTagName, AllowedColour, TagInput,
} from './tag';
import {
  Spending,
  SpendingInput,
  EditSpendingInput,
  DeleteSpendingInput,
  SpendingItemInput,
  SpendingItemsByDateInput,
} from './spending';

export const Query = `
  scalar Date
  type Query {
    users: [User]
    user(id: String!): User!
    tags(userId: String!): [Tag]
    tag(userId: String!, name: AllowedTagName): Tag!
    spending(userId: String!, limit: Int): [Spending]
    getSpendingItem(spending: SpendingItemInput!): Spending
    getSpendingItemsByDate(spending: SpendingItemsByDateInput!): [Spending]
  }
`;

export const Mutation = `
  type Mutation {
    createSpending(spending: SpendingInput!): Spending
    editSpending(spending: EditSpendingInput!): Spending
    deleteAllSpending(userId: String!): Boolean
    deleteSpending(spending: DeleteSpendingInput!): Boolean
    createUser(user: UserInput!): User
    updateUser(user: UserUpdateInput!): User
    deleteUser(id: String!): Boolean
    deleteAllSpendingByDate(spending: SpendingItemsByDateInput!): Boolean
  }
`;

export const SchemaDefinition = `schema {
  query: Query,
  mutation: Mutation
}
`;

export const QuerySchemas = [User, AllowedTagName, AllowedColour, Tag, Spending];
export const MutationSchemas = [
  TagInput,
  SpendingInput,
  EditSpendingInput,
  DeleteSpendingInput,
  SpendingItemsByDateInput,
  SpendingItemInput,
  UserInput,
  UserUpdateInput,
];
