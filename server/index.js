import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './db/connect';

import {
  SchemaDefinition, Query, Mutation, QuerySchemas, MutationSchemas,
} from './schemas';
import { QueryResolvers, MutationResolvers } from './resolvers';

const typeDefs = [SchemaDefinition, Query, Mutation, ...QuerySchemas, ...MutationSchemas];
const resolvers = {
  Query: {
    ...QueryResolvers,
  },
  Mutation: {
    ...MutationResolvers,
  },
};
connectDatabase();

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

app.use(cors());
server.applyMiddleware({ app, path: '/spending' });
app.listen({ port: 3000 }, () => console.log(`Server ready at http://localhost:3000${server.graphqlPath}`));
