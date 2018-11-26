import { TagType } from '../tags/tags-types';

export interface SpendingQueryResult {
  spending: Array<SpendingType>;
}

export interface SpendingItemType extends SpendingType {
  getSpendingItem: {
    title: string;
    price: number;
    userId: string;
    tag: TagType;
  };
}

export interface DeleteSpendingResult {
  deleteSpending: boolean;
}

export interface SpendingType {
  id: string;
  title: string;
  price: number;
}
