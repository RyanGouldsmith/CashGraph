import React from 'react';
import { Mutation, MutationFn, MutationResult, Query } from 'react-apollo';

import { UserProvider } from '../user/user-provider';
import { GetTagsQuery } from '../tags/tags-query';
import { Loading } from '../loading/loading';

import { SpendingMutation } from './spending-query';
import { SpendingForm } from './spending-form';

export const CreateSpending: React.FunctionComponent<{}> = () => {
  let titleRef = React.createRef<HTMLInputElement>();
  let priceRef = React.createRef<HTMLInputElement>();
  let tagRef = React.createRef<HTMLSelectElement>();

  const submitForm = (mutationHandler: MutationFn, userId: String) => (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const variables = {
      spending: {
        title: titleRef.current.value,
        price: Number.parseFloat(priceRef.current.value),
        tag: {
          id: tagRef.current.value
        },
        userId
      }
    };
    mutationHandler({ variables });
  };

  return (
    <UserProvider.Consumer>
      {userId => (
        <Query query={GetTagsQuery} variables={{ userId }}>
          {({ loading, data }) => {
            if (loading) return <Loading />;
            if (data) {
              const { tags } = data;
              return (
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
                          spendingData={{ tags }}
                        />
                      )}
                    </React.Fragment>
                  )}
                </Mutation>
              );
            }
            return null;
          }}
        </Query>
      )}
    </UserProvider.Consumer>
  );
};

export default CreateSpending;
