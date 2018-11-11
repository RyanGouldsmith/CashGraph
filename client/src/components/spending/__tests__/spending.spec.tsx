import 'babel-polyfill';
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { wait } from 'react-testing-library';

import { Spending } from '../spending';
import { GetSpendingQuery } from '../spending-query';
import { UserProvider } from '../../user/user-provider';

const mocks = [
  {
    request: {
      query: GetSpendingQuery,
      variables: {
        limit: 1,
        userId: '123',
      },
    },
    result: {
      data: {
        spending: [{ title: 'testSpendingTitle', price: 3.0 }],
      },
    },
  },
];

afterEach(cleanup);

test('should render the spending text', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <Spending limit={1} />
      </UserProvider.Provider>
    </MockedProvider>,
  );

  await wait(() => {
    const spendingTextNode = queryByText('Total Spending is £3');
    expect(spendingTextNode).not.toBeNull();
  });
});

test('should render two spending items', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <Spending limit={1} />
      </UserProvider.Provider>
    </MockedProvider>,
  );

  await wait(() => {
    const firstSpendingTitleNode = queryByText('testSpendingTitle');

    expect(firstSpendingTitleNode).not.toBeNull();
  });
});

test('should render the loading when loading data', async () => {
  const { getByText } = render(
    <MockedProvider mocks={[]}>
      <UserProvider.Provider value="123">
        <Spending limit={1} />
      </UserProvider.Provider>
    </MockedProvider>,
  );

  const loadingNode = getByText('Loading');
  expect(loadingNode).not.toBeNull();
});
