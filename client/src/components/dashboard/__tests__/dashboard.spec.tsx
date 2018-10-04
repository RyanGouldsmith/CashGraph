import 'babel-polyfill';
import * as React from 'react';
import * as TestLibrary from 'react-testing-library';
import * as ApolloTestUtils from 'react-apollo/test-utils';
import { GetSpendingQuery } from '../../spending/spending-query';
import { GetTagsQuery } from '../../tags/tags-query';
import { Dashboard } from '../dashboard';

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
  {
    request: {
      query: GetTagsQuery,
    },
    result: {
      data: {
        tags: [
          {
            name: 'ENTERTAINMENT',
            colour: 'RED',
          },
          {
            name: 'TRAVEL',
            colour: 'BLUE',
          },
        ],
      },
    },
  },
];

test('should match the snapshot containing tags and spending', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dashboard />
    </MockedProvider>,
  );

  expect(container).toMatchSnapshot();
});
