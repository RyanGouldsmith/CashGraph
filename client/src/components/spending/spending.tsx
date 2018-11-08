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
  // Temporary
  const userId = process.env.TEST_USER;
  return (
    <React.Fragment>
      <h1>Spending ... </h1>
      <Query query={GetSpendingQuery} variables={{ userId, limit }}>
        {({ loading, data }) => {
          if (loading) return <p className="spending__loading">Loading Spending</p>;
          if (data) {
            const { spending } = data;
            return (
              <section className="spending">
                <p>{`Total Spending is £${totalSpending(spending)}`}</p>
                {spending.map((item: SpendingType) => {
                  return (
                    <p className="spending__title" key={item.title}>
                      {item.title}
                    </p>
                  );
                })}
              </section>
            );
          }
          return null;
        }}
      </Query>
    </React.Fragment>
  );
};

export default Spending;
