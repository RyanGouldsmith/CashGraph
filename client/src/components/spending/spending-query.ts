import gql from 'graphql-tag';

export const GetSpendingQuery = gql`
  query GetSpending {
    spending(userId: 1) {
      title
      price
    }
  }
`;
