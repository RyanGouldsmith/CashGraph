import 'babel-polyfill';
import React from 'react';
import { render, cleanup, fireEvent, waitForElement, wait } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter, Route } from 'react-router';

import { UserProvider } from '../../user/user-provider';
import { DeleteSpendingMutation } from '../spending-query';
import DeleteSpending from '../delete-spending';

const mocks = [
  {
    request: {
      query: DeleteSpendingMutation,
      variables: {
        spending: {
          id: '12345',
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

test('should go to dashboard when the go back button is clicked', async () => {
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/spending/delete/12345', '/']}>
        <UserProvider.Provider value="123">
          <Route exact path="/" component={() => <h1>Home</h1>} />
          <Route exact path="/spending/delete/:id" component={DeleteSpending} />
        </UserProvider.Provider>
      </MemoryRouter>
    </MockedProvider>,
  );

  await wait(async () => {
    fireEvent.click(getByText('No, go to Dashboard'));
    await waitForElement(() => getByText('Home'));
  });
});

test('should show the deleted successfully message when a valid mutation occurs', async () => {
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/spending/delete/12345']}>
        <UserProvider.Provider value="123">
          <Route exact path="/spending/delete/:id" component={DeleteSpending} />
        </UserProvider.Provider>
      </MemoryRouter>
    </MockedProvider>,
  );

  await wait(async () => {
    fireEvent.click(getByText('Yes Delete'));
    await waitForElement(() => getByText('Deleted Successully'));
  });
});
