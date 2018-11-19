import 'babel-polyfill';
import React from 'react';
import { render } from 'react-testing-library';
import { MutationFn } from 'react-apollo';

import { EditUserForm } from '../edit-user-form';

test('should edit the information and update the users details', async () => {
  const editUser: MutationFn = () => new Promise(resolve => resolve());

  const props = {
    submitForm: () => {},
    editUser,
    userId: '123',
    emailRef: React.createRef<HTMLInputElement>(),
    nameRef: React.createRef<HTMLInputElement>(),
    userData: {
      name: 'testName',
      email: 'testEmail',
    },
  };

  expect(render(<EditUserForm {...props} />)).toMatchSnapshot();
});
