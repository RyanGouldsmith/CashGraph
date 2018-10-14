import React from 'react';
import { Query } from 'react-apollo';
import { SpendingType } from './spending-types';
import { GetSpendingQuery } from './spending-query';

const totalSpending = (spendings: Array<SpendingType>): number => {
  return spendings.reduce((acc, curr) => {
    return (acc += curr.price);
  }, 0.0);
};

export const Spending: React.SFC<{ limit: Number }> = ({ limit }) => {
  return (
    <React.Fragment>
      <h1>Spending ... </h1>
      <Query query={GetSpendingQuery} variables={{ limit }}>
        {({ loading, data: { spending } }) => {
          if (loading) return <p className="spending__loading">Loading Spending</p>;
          return (
            <section className="spending">
              <p>{`Total Spending is £${totalSpending(spending)}`}</p>
              {spending.map((item: SpendingType) => {
                return <p className="spending__title">{item.title}</p>;
              })}
            </section>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default Spending;
