import gql from 'graphql-tag';

export const GetTagsQuery = gql`
  query GetTags {
    tags {
      name
      colour
    }
  }
`;

gql`
  type TagInput {
    name: TagName
    colour: TagColour
  }
`;

gql`
  enum TagName {
    HOLIDAY
    FOOD
    TRAVEL
    ENTERTAINMENT
  }
`;

gql`
  enum TagColour {
    GREEN
    RED
    BLUE
  }
`;
