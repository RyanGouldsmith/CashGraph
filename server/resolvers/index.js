import { UserResolver } from './user';
import { TagResolver } from './tag';
import { SpendingResolver } from './spending';

export const QueryResolvers = Object.assign({}, UserResolver, TagResolver, SpendingResolver);
