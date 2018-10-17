import React from 'react';

import { Tags } from '../tags/tags';
import { Spending } from '../spending/spending';

export const Dashboard: React.SFC<{}> = () => {
  return (
    <React.Fragment>
      <h1>Cash Graph Dashboard</h1>
      <main className="dashboard">
        <Tags />
        <Spending limit={2} />
      </main>
    </React.Fragment>
  );
};
