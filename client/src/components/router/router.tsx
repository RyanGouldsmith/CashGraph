import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dashboard } from '../dashboard/dashboard';

export const Router: React.SFC<{}> = () => {
  return (
    <main className="content">
      <Switch>
        <Route path="/" component={Dashboard} exact />
      </Switch>
    </main>
  );
};
