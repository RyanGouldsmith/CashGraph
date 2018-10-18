import React from 'react';

import { Tags } from '../tags/tags';
import { Spending } from '../spending/spending';
import { Link } from 'react-router-dom';

export const Dashboard: React.SFC<{}> = () => {
  return (
    <React.Fragment>
      <h1>Cash Graph Dashboard</h1>
      <main className="dashboard">
        <section className="dashboard__tags">
          <Tags />
        </section>
        <section className="dashboard__spending">
          <Link to="/spending">More Spending ...</Link>
          <Spending limit={2} />
        </section>
      </main>
    </React.Fragment>
  );
};
