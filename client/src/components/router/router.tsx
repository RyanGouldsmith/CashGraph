import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AsyncComponent } from './async-component';

export class Router extends React.Component<{}, {}> {
  render() {
    return (
      <main className="content">
        <Switch>
          <Route
            exact
            path="/"
            component={AsyncComponent(
              () => import(/* webpackChunkName: "dashboard" */ '../dashboard/dashboard'),
              'Dashboard',
            )}
          />
          <Route
            path="/spending"
            component={AsyncComponent(
              () => import(/* webpackChunkName: "Spending" */ '../spending/spending'),
              'Spending',
            )}
          />
          <Route
            component={AsyncComponent(
              () => import(/* webpackChunkName: "Error" */ '../error/error'),
              'Error',
            )}
          />
        </Switch>
      </main>
    );
  }
}
