import React from 'react';

import { MutationFn } from 'react-apollo';

interface EditFormProps {
  submitForm: Function;
  editUser: MutationFn;
  userId: String;
  emailRef: React.Ref<HTMLInputElement>;
  nameRef: React.Ref<HTMLInputElement>;
  userData: {
    name: string;
    email: string;
  };
}

export const EditUserForm: React.SFC<EditFormProps> = ({
  submitForm,
  editUser,
  userId,
  emailRef,
  nameRef,
  userData,
}) => (
  <form onSubmit={submitForm(editUser, userId)}>
    <label htmlFor="name">Edit your name</label>
    <input id="name" type="text" defaultValue={userData.name} ref={nameRef} />
    <label htmlFor="email">Edit your email</label>
    <input id="email" type="email" defaultValue={userData.email} ref={emailRef} />
    <button type="submit">Edit Details</button>
  </form>
);
