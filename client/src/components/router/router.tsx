import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Loading } from '../loading/loading';
import { Navigation } from '../navigation/navigation';

import {
  Dashboard,
  CreateSpending,
  Spending,
  SpendingEdit,
  SpendingDelete,
  EditUser,
  Error,
} from './router-components';

const ROUTE_FOR_DASHBOARD = '/';
const ROUTE_FOR_SPENDING_CREATION = '/spending/create';
const ROUTE_FOR_SPENDING_EDIT = '/spending/edit/:id';
const ROUTE_FOR_SPENDING_DELETE = '/spending/delete/:id';
const ROUTE_FOR_SPENDING = '/spending';
const ROUTE_FOR_USER_EDIT = '/user/edit';

export const Router: React.SFC<{}> = _ => {
  return (
    <React.Fragment>
      <Navigation
        routeForDashboard={ROUTE_FOR_DASHBOARD}
        routeForSpendingCreation={ROUTE_FOR_SPENDING_CREATION}
      />
      <main className="content">
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={ROUTE_FOR_DASHBOARD} component={Dashboard} />
            <Route exact path={ROUTE_FOR_SPENDING_CREATION} component={CreateSpending} />
            <Route exact path={ROUTE_FOR_SPENDING_EDIT} component={SpendingEdit} />
            <Route exact path={ROUTE_FOR_SPENDING_DELETE} component={SpendingDelete} />
            <Route exact path={ROUTE_FOR_SPENDING} component={Spending} />
            <Route exact path={ROUTE_FOR_USER_EDIT} component={EditUser} />
            <Route component={Error} />
          </Switch>
        </React.Suspense>
      </main>
    </React.Fragment>
  );
};
