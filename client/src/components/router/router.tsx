import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Loading } from '../loading/loading';

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

export const Router: React.SFC<{}> = _ => {
  return (
    <main className="content">
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/spending/create" component={CreateSpending} />
          <Route exact path="/spending" component={Spending} />
          <Route component={Error} />
        </Switch>
      </React.Suspense>
    </main>
  );
};
