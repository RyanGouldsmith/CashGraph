import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dashboard } from '../dashboard/dashboard';
import { Spending } from '../spending/spending';

export const Router: React.SFC<{}> = () => {
  return (
    <main className="content">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/spending" component={Spending} />
      </Switch>
    </main>
  );
};
