import React from 'react';
import { UserProvider } from '../user/user-provider';
import { Mutation, MutationFn, MutationResult, Query } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router';

import { Loading } from '../loading/loading';

import { EditSpendingMutation, GetSpendingItem } from './spending-query';
import { SpendingItemType } from './spending-types';
import { SpendingForm } from './spending-form';

interface SpendingItemResult {
  loading: boolean;
  data: SpendingItemType;
}

const EditSpending: React.SFC<RouteComponentProps<any>> = ({ match }) => {
  let titleRef = React.createRef<HTMLInputElement>();
  let priceRef = React.createRef<HTMLInputElement>();
  let tagRef = React.createRef<HTMLInputElement>();
  let colourRef = React.createRef<HTMLInputElement>();
  const id = match.params.id;

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
        id,
      },
    };
    mutationHandler({ variables });
  };

  return (
    <UserProvider.Consumer>
      {(userId: string) => (
        <React.Fragment>
          <h1>Edit Spending</h1>
          <Query query={GetSpendingItem} variables={{ spending: { userId, id } }}>
            {({ loading, data }: SpendingItemResult) => {
              if (loading) return <Loading />;
              if (data) {
                const { title, price, tag } = data.getSpendingItem;
                return (
                  <Mutation mutation={EditSpendingMutation}>
                    {(editSpending: MutationFn, result: MutationResult) => (
                      <React.Fragment>
                        {result.data ? (
                          <h1>Edited successfully</h1>
                        ) : (
                          <SpendingForm
                            submitForm={submitForm}
                            spendingCallback={editSpending}
                            userId={userId}
                            titleRef={titleRef}
                            priceRef={priceRef}
                            tagRef={tagRef}
                            colourRef={colourRef}
                            spendingData={{
                              title,
                              price,
                              tagName: tag.name.toString(),
                              tagColour: tag.colour.toString(),
                            }}
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
        </React.Fragment>
      )}
    </UserProvider.Consumer>
  );
};

const EditSpendingWithRouter = withRouter(EditSpending);

export default EditSpendingWithRouter;
