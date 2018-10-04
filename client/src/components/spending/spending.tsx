import * as React from 'react';
import { graphql } from 'react-apollo';
import { SpendingQuery, SpendingType } from './spending-types';
import { GetSpendingQuery } from './spending-query';

const Spending = graphql<{}, SpendingQuery>(GetSpendingQuery);

const totalSpending = (spendings: Array<SpendingType>): number => {
  return spendings.reduce((acc, curr) => {
    return (acc += curr.price);
  }, 0.0);
};

export default Spending(({ data }) => {
  const { loading, spending = [] } = data;
  return (
    <section className="spending">
      <h1>Spending ... </h1>
      {loading && <p className="spending__loading">Loading Spending</p>}
      <p>{`Total Spending is £${totalSpending(spending)}`}</p>
      {spending.map(item => {
        return <p className="spending__title">{item.title}</p>;
      })}
    </section>
  );
});
