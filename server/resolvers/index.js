import { UserResolver } from './user';
import { TagResolver } from './tag';

export const QueryResolvers = Object.assign({}, UserResolver, TagResolver);
