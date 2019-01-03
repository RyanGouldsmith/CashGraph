import 'babel-polyfill';
import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  wait
} from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import { CreateSpending } from '../create-spending';
import { SpendingMutation } from '../spending-query';
import { UserProvider } from '../../user/user-provider';
import { GetTagsQuery } from '../../tags/tags-query';

const mocks = [
  {
    request: {
      query: SpendingMutation,
      variables: {
        spending: {
          title: 'knownTitle',
          price: 10,
          tag: {
            id: '6789'
          },
          userId: '123'
        }
      }
    },
    result: {
      data: {
        title: 'test'
      }
    }
  },
  {
    request: {
      query: SpendingMutation,
      variables: {
        spending: {
          title: 'knownTitle',
          price: 0,
          tag: {
            id: '6789'
          },
          userId: '123'
        }
      }
    },
    result: {
      data: {}
    }
  },
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

test('should submit successfully and show error response to the user', async () => {
  const { getByLabelText, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <CreateSpending />
      </UserProvider.Provider>
    </MockedProvider>
  );
  await wait(async () => {
    const titleInput = getByLabelText('Enter the item you purchased');
    const priceInput = getByLabelText('The price of the item');
    const tagInput = getByLabelText('Type of Tag');

    fireEvent.change(titleInput, { target: { value: 'knownTitle' } });
    fireEvent.change(priceInput, { target: { value: 10 } });
    fireEvent.change(tagInput, { target: { value: '6789' } });
    fireEvent.click(getByText('submit'));

    await waitForElement(() => getByText('Created successfully'));
  });
});

test('should not see the success message when the form is part completed', async () => {
  const { getByLabelText, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <CreateSpending />
      </UserProvider.Provider>
    </MockedProvider>
  );
  await wait(async () => {
    const titleInput = getByLabelText('Enter the item you purchased');
    const priceInput = getByLabelText('The price of the item');

    fireEvent.change(titleInput, { target: { value: 'knownTitle' } });
    fireEvent.change(priceInput, { target: { value: 0 } });

    fireEvent.click(getByText('submit'));

    await waitForElement(() => getByLabelText('Enter the item you purchased'));
  });
});
