import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  routeForDashboard: string;
  routeForSpendingCreation: string;
}

export const Navigation = React.memo<NavigationProps>(
  ({ routeForDashboard, routeForSpendingCreation }) => (
    <header>
      <nav>
        <Link to={routeForDashboard}>Home</Link>
        <Link to={routeForSpendingCreation}>Create Spending</Link>
      </nav>
    </header>
  ),
);
