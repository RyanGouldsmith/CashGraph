import 'babel-polyfill';
import * as React from 'react';
import * as TestLibrary from 'react-testing-library';
import * as ApolloTestUtils from 'react-apollo/test-utils';
import { wait } from 'react-testing-library';

import Spending from '../spending';
import { GetSpendingQuery } from '../spending-query';

const { render, cleanup } = TestLibrary;
const { MockedProvider } = ApolloTestUtils;

afterEach(cleanup);
const mocks = [
  {
    request: {
      query: GetSpendingQuery,
    },
    result: {
      data: {
        spending: [
          { title: 'testSpendingTitle', price: 3.0 },
          { title: 'anotherSpendingTitle', price: 7.0 },
        ],
      },
    },
  },
];

test('should render the spending text', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Spending />
    </MockedProvider>,
  );

  await wait(() => {
    const spendingTextNode = queryByText('Total Spending is £10');
    expect(spendingTextNode).not.toBeNull();
  });
});

test('should render two spending items', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Spending />
    </MockedProvider>,
  );

  await wait(() => {
    const firstSpendingTitleNode = queryByText('testSpendingTitle');
    const secondSpendingTitleNode = queryByText('anotherSpendingTitle');

    expect(firstSpendingTitleNode).not.toBeNull();
    expect(secondSpendingTitleNode).not.toBeNull();
  });
});

test('should render the loading when loading data', async () => {
  const { container } = render(
    <MockedProvider mocks={[]}>
      <Spending />
    </MockedProvider>,
  );

  const loadingNode = container.querySelector('.spending__loading');
  expect(loadingNode).not.toBeNull();
});
