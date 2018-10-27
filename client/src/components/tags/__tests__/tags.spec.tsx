import 'babel-polyfill';
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import { Tags } from '../tags';
import { GetTagsQuery } from '../tags-query';
import { wait } from 'react-testing-library';

const mocks = [
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

afterEach(cleanup);

test('should render the tags', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Tags />
    </MockedProvider>,
  );

  await wait(() => {
    const entertainmentTagNode = queryByText('ENTERTAINMENT');
    const travelTagNode = queryByText('TRAVEL');

    expect(entertainmentTagNode).not.toBeNull();
    expect(travelTagNode).not.toBeNull();
    expect(entertainmentTagNode.style.color).toEqual('RED');
    expect(travelTagNode.style.color).toEqual('BLUE');
  });
});

test('should render the loading text', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Tags />
    </MockedProvider>,
  );

  const loadingNode = queryByText('Loading...');
  expect(loadingNode).not.toBeNull();
});
