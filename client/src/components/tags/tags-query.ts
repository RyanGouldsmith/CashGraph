import gql from 'graphql-tag';

export const GetTagsQuery = gql`
  query GetTags {
    tags {
      name
      colour
    }
  }
`;
