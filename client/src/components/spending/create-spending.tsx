import React from 'react';
import { UserProvider } from '../user/user-provider';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { SpendingMutation } from './spending-query';

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
                <form onSubmit={submitForm(createSpending, userId)}>
                  <label htmlFor="title">Enter the item you purchased</label>
                  <input id="title" placeholder="Shoes" type="text" ref={titleRef} />
                  <label htmlFor="price">The price of the item</label>
                  <input id="price" type="number" min="0" ref={priceRef} />
                  <label htmlFor="tag">Type of Tag</label>
                  <input id="tag" ref={tagRef} />
                  <label htmlFor="tag-colour">Tag Colour</label>
                  <input id="tag-colour" ref={colourRef} />
                  <button type="submit">submit</button>
                </form>
              )}
            </React.Fragment>
          )}
        </Mutation>
      )}
    </UserProvider.Consumer>
  );
};

export default CreateSpending;
