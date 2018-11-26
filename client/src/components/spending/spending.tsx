import React from 'react';
import { Query } from 'react-apollo';
import { SpendingType, SpendingQueryResult } from './spending-types';
import { GetSpendingQuery } from './spending-query';
import { UserProvider } from '../user/user-provider';
import { Loading } from '../loading/loading';
import { Link } from 'react-router-dom';

const totalSpending = (spendings: Array<SpendingType>): number => {
  return spendings.reduce((acc, curr) => {
    return (acc += curr.price);
  }, 0.0);
};

interface SpendingResult {
  loading: boolean;
  data: SpendingQueryResult;
}

interface SpendingProps {
  limit?: Number;
  shouldShowEditLink?: Boolean;
  shouldShowDeleteLink?: Boolean;
}

export const Spending: React.SFC<SpendingProps> = ({
  limit,
  shouldShowEditLink = true,
  shouldShowDeleteLink = true,
}) => {
  return (
    <UserProvider.Consumer>
      {userId => (
        <React.Fragment>
          <h1>Spending ... </h1>
          <Query query={GetSpendingQuery} variables={{ userId, limit }}>
            {({ loading, data }: SpendingResult) => {
              if (loading) return <Loading />;
              if (data) {
                const { spending } = data;
                return (
                  <section className="spending">
                    <p>{`Total Spending is £${totalSpending(spending).toFixed(2)}`}</p>
                    {spending.map((item: SpendingType) => {
                      return (
                        <section className="spending__item">
                          <p className="spending__item-title" key={item.title}>
                            {item.title}
                          </p>
                          {shouldShowEditLink && (
                            <Link to={`/spending/edit/${item.id}`}>Edit Spending Item</Link>
                          )}
                          {shouldShowDeleteLink && (
                            <Link to={`/spending/delete/${item.id}`}>Delete Spending Item</Link>
                          )}
                        </section>
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
