import { User } from './user';
import { Tag, AllowedTagName, AllowedColour } from './tag';

export const Query = `
  type Query {
    users: [User]
    user(email: String): User!
    tags: [Tag]
    tag(name: AllowedTagName): Tag!
  }
`;

export const SchemaDefinition = `schema {
  query: Query
}
`;

export const Schemas = [User, AllowedTagName, AllowedColour, Tag];
