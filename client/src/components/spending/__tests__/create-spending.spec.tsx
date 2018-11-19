import 'babel-polyfill';
import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import { CreateSpending } from '../create-spending';
import { SpendingMutation } from '../spending-query';
import { UserProvider } from '../../user/user-provider';

const mocks = [
  {
    request: {
      query: SpendingMutation,
      variables: {
        spending: {
          title: 'knownTitle',
          price: 10,
          tag: {
            name: 'FOOD',
            colour: 'RED',
          },
          userId: '123',
        },
      },
    },
    result: {
      data: {
        title: 'test',
      },
    },
  },
  {
    request: {
      query: SpendingMutation,
      variables: {
        spending: {
          title: 'knownTitle',
          price: 0,
          tag: {
            name: '',
            colour: '',
          },
          userId: '123',
        },
      },
    },
    result: {
      data: {},
    },
  },
];

afterEach(cleanup);

test('should submit successfully and show error response to the user', async () => {
  const { getByLabelText, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <CreateSpending />
      </UserProvider.Provider>
    </MockedProvider>,
  );

  const titleInput = getByLabelText('Enter the item you purchased');
  const priceInput = getByLabelText('The price of the item');
  const tagInput = getByLabelText('Type of Tag');
  const tagColourInput = getByLabelText('Tag Colour');

  fireEvent.change(titleInput, { target: { value: 'knownTitle' } });
  fireEvent.change(priceInput, { target: { value: 10 } });
  fireEvent.change(tagInput, { target: { value: 'FOOD' } });
  fireEvent.change(tagColourInput, { target: { value: 'RED' } });
  fireEvent.click(getByText('submit'));

  await waitForElement(() => getByText('Created successfully'));
});

test('should not see the success message when the form is part completed', async () => {
  const { getByLabelText, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <CreateSpending />
      </UserProvider.Provider>
    </MockedProvider>,
  );

  const titleInput = getByLabelText('Enter the item you purchased');
  const priceInput = getByLabelText('The price of the item');

  fireEvent.change(titleInput, { target: { value: 'knownTitle' } });
  fireEvent.change(priceInput, { target: { value: 0 } });

  fireEvent.click(getByText('submit'));

  await waitForElement(() => getByLabelText('Enter the item you purchased'));
});
