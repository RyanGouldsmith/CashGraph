const Person = `
  type Person {
    name: String
  }
`;

export const Query = `
  type Query {
    person: [Person]
  }
`;

export const SchemaDefinition = `schema {
  query: Query
}`;

export const Schemas = [Person];
