import React from 'react';
import { Link } from 'react-router-dom';

import { UserDetails } from '../user/user-details/user-details';

interface NavigationProps {
  routeForDashboard: string;
  routeForSpendingCreation: string;
}

export const Navigation: React.FunctionComponent<NavigationProps> = ({
  routeForDashboard,
  routeForSpendingCreation
}) => (
  <header>
    <NavigationBar
      routeForDashboard={routeForDashboard}
      routeForSpendingCreation={routeForSpendingCreation}
    />
    <UserDetails />
  </header>
);

const NavigationBar = React.memo<NavigationProps>(
  ({ routeForDashboard, routeForSpendingCreation }) => (
    <nav>
      <Link to={routeForDashboard}>Home</Link>
      <Link to={routeForSpendingCreation}>Create Spending</Link>
    </nav>
  )
);
