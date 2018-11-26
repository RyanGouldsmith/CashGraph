import React from 'react';
import { Link } from 'react-router-dom';

import { Tags } from '../tags/tags';
import { Spending } from '../spending/spending';

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
          <Spending limit={2} shouldShowEditLink={false} shouldShowDeleteLink={false} />
        </section>
      </main>
    </React.Fragment>
  );
};

export default Dashboard;
