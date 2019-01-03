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
import { MemoryRouter, Route } from 'react-router';

import { UserProvider } from '../../user/user-provider';
import { GetTagsQuery } from '../../tags/tags-query';
import { EditSpendingMutation, GetSpendingItem } from '../spending-query';
import EditSpending from '../edit-spending';

const mocks = [
  {
    request: {
      query: EditSpendingMutation,
      variables: {
        spending: {
          id: '12345',
          title: 'newTitle',
          price: 10.0,
          tag: {
            id: '12345'
          },
          userId: '123'
        }
      }
    },
    result: {
      data: {
        title: 'newTitle'
      }
    }
  },
  {
    request: {
      query: GetSpendingItem,
      variables: {
        spending: {
          id: '12345',
          userId: '123'
        }
      }
    },
    result: {
      data: {
        getSpendingItem: {
          title: 'testSpendingTitle',
          price: 3.0,
          id: '12345',
          tag: [
            {
              id: '6789',
              name: 'HOLIDAY',
              colour: 'BLUE'
            }
          ]
        }
      }
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
            name: 'HOLIDAY',
            colour: 'BLUE'
          }
        ]
      }
    }
  }
];

afterEach(cleanup);

test('should populate the form from the query for the spending details', async () => {
  const { getByLabelText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/spending/edit/12345']}>
        <UserProvider.Provider value="123">
          <Route exact path="/spending/edit/:id" component={EditSpending} />
        </UserProvider.Provider>
      </MemoryRouter>
    </MockedProvider>
  );

  await wait(() => {
    const titleInput = getByLabelText('Enter the item you purchased');
    const priceInput = getByLabelText('The price of the item');

    expect(titleInput.getAttribute('value')).toEqual('testSpendingTitle');
    expect(priceInput.getAttribute('value')).toEqual('3.00');
  });
});

test('should edit the information and update the spending item details', async () => {
  const { getByLabelText, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/spending/edit/12345']}>
        <UserProvider.Provider value="123">
          <Route exact path="/spending/edit/:id" component={EditSpending} />
        </UserProvider.Provider>
      </MemoryRouter>
    </MockedProvider>
  );

  await wait(async () => {
    const titleInput = getByLabelText('Enter the item you purchased');
    const priceInput = getByLabelText('The price of the item');
    const tagNameInput = getByLabelText('Type of Tag');

    fireEvent.change(titleInput, { target: { value: 'newTitle' } });
    fireEvent.change(priceInput, { target: { value: 10.0 } });
    fireEvent.change(tagNameInput, { target: { value: '12345' } });
    fireEvent.click(getByText('submit'));
    await waitForElement(() => getByText('Edited successfully'));
  });
});
