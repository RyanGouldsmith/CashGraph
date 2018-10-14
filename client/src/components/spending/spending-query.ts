import gql from 'graphql-tag';

export const GetSpendingQuery = gql`
  query GetSpending($limit: Int) {
    spending(userId: 1, limit: $limit) {
      title
      price
    }
  }
`;
