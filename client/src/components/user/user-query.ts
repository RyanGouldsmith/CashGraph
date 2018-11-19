import gql from 'graphql-tag';

export const GetUserQuery = gql`
  query GetUser($userId: String!) {
    user(id: $userId) {
      name
      email
    }
  }
`;

gql`
  type UserUpdateInput {
    name: String
    email: String
    id: String
  }
`;

export const EditUserMutation = gql`
  mutation EditUser($user: UserUpdateInput!) {
    updateUser(user: $user) {
      name
    }
  }
`;
