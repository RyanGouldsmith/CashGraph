const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { SchemaDefinition, Query, Schemas } = require('./schemas');
const { QueryResolvers } = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, ...Schemas],
  resolvers: {
    Query: {
      ...QueryResolvers,
    },
  },
});

const app = express();

app.use('/spending', bodyParser.json(), graphqlExpress({ schema }));
app.use('/spendingi', graphiqlExpress({ endpointURL: '/spending' }));

app.listen(3000);
