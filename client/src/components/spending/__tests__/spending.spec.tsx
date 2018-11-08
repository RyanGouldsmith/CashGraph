import 'babel-polyfill';
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { wait } from 'react-testing-library';

import { Spending } from '../spending';
import { GetSpendingQuery } from '../spending-query';

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

let originalProcessEnv = Object.assign({}, process.env);

beforeEach(() => {
  process.env.TEST_USER = '123';
});

afterEach(() => {
  cleanup();
  process.env = originalProcessEnv;
});

test('should render the spending text', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Spending limit={1} />
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
      <Spending limit={1} />
    </MockedProvider>,
  );

  await wait(() => {
    const firstSpendingTitleNode = queryByText('testSpendingTitle');

    expect(firstSpendingTitleNode).not.toBeNull();
  });
});

test('should render the loading when loading data', async () => {
  const { container } = render(
    <MockedProvider mocks={[]}>
      <Spending limit={1} />
    </MockedProvider>,
  );

  const loadingNode = container.querySelector('.spending__loading');
  expect(loadingNode).not.toBeNull();
});
