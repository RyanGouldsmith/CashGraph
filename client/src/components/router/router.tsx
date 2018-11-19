import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Loading } from '../loading/loading';
import { Navigation } from '../navigation/navigation';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "dashboard" */ '../dashboard/dashboard'),
);

const Spending = React.lazy(() =>
  import(/* webpackChunkName: "spending" */ '../spending/spending'),
);

const Error = React.lazy(() => import(/* webpackChunkName: "error" */ '../error/error'));

const CreateSpending = React.lazy(() =>
  import(/* webpackChunkName: "create-spending" */ '../spending/create-spending'),
);

const EditUser = React.lazy(() =>
  import(/* webpackChunkName: "edit-user" */ '../user/edit-user/edit-user'),
);

const ROUTE_FOR_DASHBOARD = '/';
const ROUTE_FOR_SPENDING_CREATION = '/spending/create';
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
            <Route exact path={ROUTE_FOR_SPENDING} component={Spending} />
            <Route exact path={ROUTE_FOR_USER_EDIT} component={EditUser} />
            <Route component={Error} />
          </Switch>
        </React.Suspense>
      </main>
    </React.Fragment>
  );
};
