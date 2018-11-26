import gql from 'graphql-tag';

export const GetSpendingQuery = gql`
  query GetSpending($userId: String!, $limit: Int) {
    spending(userId: $userId, limit: $limit) {
      id
      title
      price
    }
  }
`;

export const GetSpendingItem = gql`
  query GetSpendingItem($spending: SpendingItemInput!) {
    getSpendingItem(spending: $spending) {
      id
      title
      price
      tag {
        name
        colour
      }
    }
  }
`;

gql`
  input SpendingItemInput {
    id: String!
    userId: String!
  }
`;

gql`
  type SpendingInput {
    title: String!
    price: Float!
    tag: TagInput
    userId: String!
  }
`;

gql`
  type DeleteSpendingInput {
    id: String!
    userId: String!
  }
`;

gql`
  type EditSpendingInput {
    id: String!
    title: String
    price: Float
    tag: TagInput
    userId: String!
  }
`;

export const SpendingMutation = gql`
  mutation CreateSpending($spending: SpendingInput!) {
    createSpending(spending: $spending) {
      title
    }
  }
`;

export const EditSpendingMutation = gql`
  mutation EditSpendingItem($spending: EditSpendingInput!) {
    editSpending(spending: $spending) {
      title
    }
  }
`;

export const DeleteSpendingMutation = gql`
  mutation DeleteSpendingItem($spending: DeleteSpendingInput!) {
    deleteSpending(spending: $spending)
  }
`;
