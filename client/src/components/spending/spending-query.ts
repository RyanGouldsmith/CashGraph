import gql from 'graphql-tag';

export const GetSpendingQuery = gql`
  query GetSpending($userId: String!, $limit: Int) {
    spending(userId: $userId, limit: $limit) {
      title
      price
    }
  }
`;
