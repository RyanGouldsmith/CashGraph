import React from 'react';
import { UserProvider } from '../user-provider';
import { Query, Mutation, MutationFn, MutationResult } from 'react-apollo';
import { UserQueryResult } from '../user-types';
import { Loading } from '../../loading/loading';
import { EditUserMutation, GetUserQuery } from '../user-query';

import { EditUserForm } from './edit-user-form';

export const EditUser: React.FunctionComponent<{}> = () => {
  let emailRef = React.createRef<HTMLInputElement>();
  let nameRef = React.createRef<HTMLInputElement>();

  const submitForm = (mutationHandler: MutationFn, userId: String) => (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const variables = {
      user: {
        name: nameRef.current.value,
        email: emailRef.current.value,
        id: userId
      }
    };
    mutationHandler({ variables });
  };

  return (
    <UserProvider.Consumer>
      {(userId: String) => (
        <React.Fragment>
          <h1>Edit your details</h1>
          <Query query={GetUserQuery} variables={{ userId }}>
            {({ loading, data }: UserQueryResult) => {
              if (loading) return <Loading />;
              if (data)
                return (
                  <Mutation mutation={EditUserMutation}>
                    {(editUser: MutationFn, result: MutationResult) => (
                      <React.Fragment>
                        {result.data ? (
                          <h1>Edited successfully</h1>
                        ) : (
                          <EditUserForm
                            submitForm={submitForm}
                            editUser={editUser}
                            userId={userId}
                            emailRef={emailRef}
                            nameRef={nameRef}
                            userData={data.user}
                          />
                        )}
                      </React.Fragment>
                    )}
                  </Mutation>
                );
              return null;
            }}
          </Query>
        </React.Fragment>
      )}
    </UserProvider.Consumer>
  );
};

export default EditUser;
