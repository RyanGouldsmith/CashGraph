import 'babel-polyfill';
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { wait } from 'react-testing-library';

import { UserDetails } from '../user-details';
import { GetUserQuery } from '../../user-query';
import { UserProvider } from '../../../user/user-provider';

const mocks = [
  {
    request: {
      query: GetUserQuery,
      variables: {
        userId: '123',
      },
    },
    result: {
      data: {
        user: {
          name: 'testUser',
          email: 'test@user.uk',
        },
      },
    },
  },
];

afterEach(cleanup);

test('should render the user name', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <UserDetails />
      </UserProvider.Provider>
    </MockedProvider>,
  );

  await wait(() => {
    const spendingTextNode = queryByText('Welcome, testUser');
    expect(spendingTextNode).not.toBeNull();
  });
});

test('should render the loading when loading data', async () => {
  const { getByText } = render(
    <MockedProvider mocks={[]}>
      <UserProvider.Provider value="123">
        <UserDetails />
      </UserProvider.Provider>
    </MockedProvider>,
  );

  const loadingNode = getByText('Loading');
  expect(loadingNode).not.toBeNull();
});
