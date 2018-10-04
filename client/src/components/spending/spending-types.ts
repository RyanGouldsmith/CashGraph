export interface SpendingQuery {
  spending: Array<SpendingType>;
}

export interface SpendingType {
  title: string;
  price: number;
}
