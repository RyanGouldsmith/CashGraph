import { Person } from './person';
import { Tag, AllowedTagName, AllowedColour } from './tag';

export const Query = `
  type Query {
    persons: [Person]
    person(email: String): Person!
    tags: [Tag]
    tag(name: AllowedTagName): Tag!
  }
`;

export const SchemaDefinition = `schema {
  query: Query
}
`;

export const Schemas = [Person, AllowedTagName, AllowedColour, Tag];
