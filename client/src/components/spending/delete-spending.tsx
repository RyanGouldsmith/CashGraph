import React from 'react';
import { UserProvider } from '../user/user-provider';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { DeleteSpendingMutation } from './spending-query';
import { DeleteSpendingResult } from './spending-types';

const SpendingDelete: React.FunctionComponent<RouteComponentProps<any>> = ({
  match,
  history
}) => {
  const { id } = match.params;

  const goBack = () => history.push('/');
  const handleDelete = (deleteSpending: MutationFn, userId: string) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    const variables = {
      spending: {
        userId,
        id
      }
    };
    deleteSpending({ variables });
  };

  return (
    <UserProvider.Consumer>
      {(userId: string) => (
        <React.Fragment>
          <h2>Are you sure you want to delete this item?</h2>
          <Mutation mutation={DeleteSpendingMutation}>
            {(
              deleteSpending: MutationFn,
              result: MutationResult<DeleteSpendingResult>
            ) => (
              <React.Fragment>
                {result.data ? (
                  <React.Fragment>
                    <h1>Deleted Successully</h1>
                    <Link to="/">Go Back</Link>
                  </React.Fragment>
                ) : (
                  <section className="spending__delete">
                    <button onClick={goBack}>No, go to Dashboard</button>
                    <button onClick={handleDelete(deleteSpending, userId)}>
                      Yes Delete
                    </button>
                  </section>
                )}
              </React.Fragment>
            )}
          </Mutation>
        </React.Fragment>
      )}
    </UserProvider.Consumer>
  );
};

const SpendingDeleteWithRouter = withRouter(SpendingDelete);

export default SpendingDeleteWithRouter;
