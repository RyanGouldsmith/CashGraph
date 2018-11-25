import React from 'react';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';

import { UserProvider } from '../user/user-provider';

import { SpendingMutation } from './spending-query';
import { SpendingForm } from './spending-form';

export const CreateSpending: React.SFC<{}> = () => {
  let titleRef = React.createRef<HTMLInputElement>();
  let priceRef = React.createRef<HTMLInputElement>();
  let tagRef = React.createRef<HTMLInputElement>();
  let colourRef = React.createRef<HTMLInputElement>();

  const submitForm = (mutationHandler: MutationFn, userId: String) => (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const variables = {
      spending: {
        title: titleRef.current.value,
        price: Number.parseFloat(priceRef.current.value),
        tag: {
          name: tagRef.current.value,
          colour: colourRef.current.value,
        },
        userId,
      },
    };
    mutationHandler({ variables });
  };

  return (
    <UserProvider.Consumer>
      {userId => (
        <Mutation mutation={SpendingMutation}>
          {(createSpending: MutationFn, result: MutationResult) => (
            <React.Fragment>
              {result.data ? (
                <h1>Created successfully</h1>
              ) : (
                <SpendingForm
                  submitForm={submitForm}
                  spendingCallback={createSpending}
                  userId={userId}
                  titleRef={titleRef}
                  priceRef={priceRef}
                  tagRef={tagRef}
                  colourRef={colourRef}
                  spendingData={{}}
                />
              )}
            </React.Fragment>
          )}
        </Mutation>
      )}
    </UserProvider.Consumer>
  );
};

export default CreateSpending;
