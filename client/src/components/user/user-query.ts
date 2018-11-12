import gql from 'graphql-tag';

export const GetUserQuery = gql`
  query GetUser($userId: String!) {
    user(id: $userId) {
      name
    }
  }
`;
