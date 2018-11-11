import React from 'react';
import { Query } from 'react-apollo';
import { SpendingType } from './spending-types';
import { GetSpendingQuery } from './spending-query';
import { UserProvider } from '../user/user-provider';
import { Loading } from '../loading/loading';

const totalSpending = (spendings: Array<SpendingType>): number => {
  return spendings.reduce((acc, curr) => {
    return (acc += curr.price);
  }, 0.0);
};

export const Spending: React.SFC<{ limit: Number }> = ({ limit }) => {
  return (
    <UserProvider.Consumer>
      {userId => (
        <React.Fragment>
          <h1>Spending ... </h1>
          <Query query={GetSpendingQuery} variables={{ userId, limit }}>
            {({ loading, data }) => {
              if (loading) return <Loading />;
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
      )}
    </UserProvider.Consumer>
  );
};

export default Spending;
