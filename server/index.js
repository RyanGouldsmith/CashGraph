const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const schemaTypeDefs = require('./schemas');

const SchemaDefinition = `schema {
  query: Person
}`;

const Root = `type Person {
  name: String
}`;

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Root, ...schemaTypeDefs],
  resolvers: {},
});

const app = express();

app.use('/spending', bodyParser.json(), graphqlExpress({ schema }));
app.use('/spendingi', graphiqlExpress({ endpointURL: '/spending' }));

app.listen(3000);
