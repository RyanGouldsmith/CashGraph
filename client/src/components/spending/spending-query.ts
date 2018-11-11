import gql from 'graphql-tag';

export const GetSpendingQuery = gql`
  query GetSpending($userId: String!, $limit: Int) {
    spending(userId: $userId, limit: $limit) {
      title
      price
    }
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

export const SpendingMutation = gql`
  mutation CreateSpending($spending: SpendingInput) {
    createSpending(spending: $spending) {
      title
    }
  }
`;
