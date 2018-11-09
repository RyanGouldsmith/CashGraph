import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './db/connect';

import { SchemaDefinition, Query, Schemas } from './schemas';
import { QueryResolvers } from './resolvers';

const typeDefs = [SchemaDefinition, Query, ...Schemas];
const resolvers = {
  Query: {
    ...QueryResolvers,
  },
};
connectDatabase();

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

app.use(cors());
server.applyMiddleware({ app, path: '/spending' });
app.listen({ port: 3000 }, () => console.log(`Server ready at http://localhost:3000${server.graphqlPath}`));
