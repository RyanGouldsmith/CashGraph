import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { connectDatabase } from './db/connect';

import { SchemaDefinition, Query, Schemas } from './schemas';
import { QueryResolvers } from './resolvers';

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, Query, ...Schemas],
  resolvers: {
    Query: {
      ...QueryResolvers,
    },
  },
});

const app = express();
connectDatabase();
app.use(cors());

app.use('/spending', bodyParser.json(), graphqlExpress({ schema }));
app.use('/spendingi', graphiqlExpress({ endpointURL: '/spending' }));

app.listen(3000);
