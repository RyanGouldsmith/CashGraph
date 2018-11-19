import 'babel-polyfill';
import React from 'react';
import { render, cleanup, fireEvent, waitForElement, wait } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';

import { UserProvider } from '../../../user/user-provider';
import EditUser from '../edit-user';
import { EditUserMutation, GetUserQuery } from '../../user-query';

const mocks = [
  {
    request: {
      query: EditUserMutation,
      variables: {
        user: {
          name: 'test-this-test',
          email: 'test@user.uk',
          id: '123',
        },
      },
    },
    result: {
      data: {
        name: 'test',
      },
    },
  },
  {
    request: {
      query: GetUserQuery,
      variables: {
        userId: '123',
      },
    },
    result: {
      data: {
        user: {
          name: 'test',
          email: 'test@user.uk',
        },
      },
    },
  },
];

afterEach(cleanup);

test('should populate the form from the query for the user details', async () => {
  const { getByLabelText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <EditUser />
      </UserProvider.Provider>
    </MockedProvider>,
  );

  await wait(() => {
    const nameInput = getByLabelText('Edit your name');
    const emailInput = getByLabelText('Edit your email');

    expect(nameInput.getAttribute('value')).toEqual('test');
    expect(emailInput.getAttribute('value')).toEqual('test@user.uk');
  });
});

test('should edit the information and update the users details', async () => {
  const { getByLabelText, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProvider.Provider value="123">
        <EditUser />
      </UserProvider.Provider>
    </MockedProvider>,
  );

  await wait(async () => {
    const nameInput = getByLabelText('Edit your name');
    const emailInput = getByLabelText('Edit your email');

    fireEvent.change(nameInput, { target: { value: 'test-this-test' } });
    fireEvent.change(emailInput, { target: { value: 'test@user.uk' } });
    fireEvent.click(getByText('Edit Details'));
    await waitForElement(() => getByText('Edited successfully'));
  });
});
