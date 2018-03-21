import { PersonResolver } from './person';
import { TagResolver } from './tag';

export const QueryResolvers = Object.assign({}, PersonResolver, TagResolver);
