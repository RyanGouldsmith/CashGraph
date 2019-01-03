import 'babel-polyfill';
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import { Tags } from '../tags';
import { GetTagsQuery } from '../tags-query';
import { wait } from 'react-testing-library';
import { UserProvider } from '../../user/user-provider';

const mocks = [
  {
    request: {
      query: GetTagsQuery,
      variables: {
        userId: '123'
      }
    },
    result: {
      data: {
        tags: [
          {
            id: '12345',
            name: 'ENTERTAINMENT',
            colour: 'RED'
          },
          {
            id: '6789',
            name: 'TRAVEL',
            colour: 'BLUE'
          }
        ]
      }
    }
  }
];

afterEach(cleanup);

test('should render the tags', async () => {
  const { queryByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <Tags />
      </UserProvider.Provider>
    </MockedProvider>
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
      <UserProvider.Provider value="123">
        <Tags />
      </UserProvider.Provider>
    </MockedProvider>
  );

  const loadingNode = queryByText('Loading');
  expect(loadingNode).not.toBeNull();
});
