export interface SpendingQueryResult {
  spending: Array<SpendingType>;
}

export interface SpendingType {
  title: string;
  price: number;
}
