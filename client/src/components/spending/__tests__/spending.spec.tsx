import 'babel-polyfill';
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { wait } from 'react-testing-library';
import { MemoryRouter } from 'react-router';

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
        spending: [{ title: 'testSpendingTitle', price: 3.0, id: '123' }],
      },
    },
  },
];

afterEach(cleanup);

test('should render the spending text', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <MemoryRouter>
          <Spending limit={1} />
        </MemoryRouter>
      </UserProvider.Provider>
    </MockedProvider>,
  );

  await wait(() => {
    const spendingTextNode = queryByText('Total Spending is £3.00');
    expect(spendingTextNode).not.toBeNull();
  });
});

test('should render two spending items with an edit link', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <MemoryRouter>
          <Spending limit={1} />
        </MemoryRouter>
      </UserProvider.Provider>
    </MockedProvider>,
  );

  await wait(() => {
    const firstSpendingTitleNode = queryByText('testSpendingTitle');
    const editLink = queryByText('Edit Spending Item');

    expect(firstSpendingTitleNode).not.toBeNull();
    expect(editLink).not.toBeNull();
    expect(editLink.getAttribute('href')).toEqual('/spending/edit/123');
  });
});

test('should not render the edit link when the prop "shouldShowEditLink" is false', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <MemoryRouter>
          <Spending limit={1} shouldShowEditLink={false} />
        </MemoryRouter>
      </UserProvider.Provider>
    </MockedProvider>,
  );

  await wait(() => {
    const editLink = queryByText('Edit Spending Item');

    expect(editLink).toBeNull();
  });
});

test('should render the loading when loading data', async () => {
  const { getByText } = render(
    <MockedProvider mocks={[]}>
      <UserProvider.Provider value="123">
        <MemoryRouter>
          <Spending limit={1} />
        </MemoryRouter>
      </UserProvider.Provider>
    </MockedProvider>,
  );

  const loadingNode = getByText('Loading');
  expect(loadingNode).not.toBeNull();
});
