import React from 'react';
import { UserProvider } from '../user/user-provider';
import { Mutation, MutationFn, MutationResult, Query } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router';

import { Loading } from '../loading/loading';
import { GetTagsQuery } from '../tags/tags-query';

import { EditSpendingMutation, GetSpendingItem } from './spending-query';
import { SpendingItemType } from './spending-types';
import { SpendingForm } from './spending-form';

type SpendingItemResult = {
  loading: boolean;
  data: SpendingItemType;
};

const EditSpending: React.FunctionComponent<RouteComponentProps<any>> = ({
  match
}) => {
  let titleRef = React.createRef<HTMLInputElement>();
  let priceRef = React.createRef<HTMLInputElement>();
  let tagRef = React.createRef<HTMLSelectElement>();
  const id = match.params.id;

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
        userId,
        id
      }
    };
    mutationHandler({ variables });
  };

  return (
    <UserProvider.Consumer>
      {(userId: string) => (
        <React.Fragment>
          <h1>Edit Spending</h1>
          <Query query={GetTagsQuery} variables={{ userId }}>
            {({ loading, data }) => {
              if (loading) return <Loading />;
              if (data) {
                const { tags } = data;
                return (
                  <Query
                    query={GetSpendingItem}
                    variables={{ spending: { userId, id } }}
                  >
                    {({ loading, data }: SpendingItemResult) => {
                      if (loading) return <Loading />;
                      if (data) {
                        const { title, price, tag } = data.getSpendingItem;
                        return (
                          <Mutation mutation={EditSpendingMutation}>
                            {(
                              editSpending: MutationFn,
                              result: MutationResult
                            ) => (
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
                                    spendingData={{
                                      title,
                                      price,
                                      tags,
                                      selectedTag: tag[0].id
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
