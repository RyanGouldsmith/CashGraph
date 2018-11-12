import React from 'react';
import { Query } from 'react-apollo';

import { Loading } from '../loading/loading';

import { UserProvider } from './user-provider';
import { GetUserQuery } from './user-query';
import { UserResult } from './user-types';

interface UserQueryResult {
  loading: boolean;
  data: UserResult;
}

export const UserDetails: React.SFC<{}> = () => (
  <UserProvider.Consumer>
    {(userId: String) => (
      <Query query={GetUserQuery} variables={{ userId }}>
        {({ loading, data }: UserQueryResult) => {
          if (loading) return <Loading />;
          if (data) return <p>Welcome, {data.user.name}</p>;
          return null;
        }}
      </Query>
    )}
  </UserProvider.Consumer>
);

export default UserDetails;
