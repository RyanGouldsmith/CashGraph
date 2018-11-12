import { UserResolver } from './user';
import { TagResolver } from './tag';
import { SpendingResolver } from './spending';

export const QueryResolvers = Object.assign(
  {},
  UserResolver.Query,
  TagResolver,
  SpendingResolver.Query,
);

export const MutationResolvers = Object.assign(
  {},
  SpendingResolver.Mutation,
  UserResolver.Mutation,
);
