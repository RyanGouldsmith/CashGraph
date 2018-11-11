import 'babel-polyfill';
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router';

import { Navigation } from '../navigation';

afterEach(cleanup);

test('should match the snapshot for navigation', async () => {
  const { container } = render(
    <MemoryRouter>
      <Navigation
        routeForDashboard="/knownRouteForDashboard"
        routeForSpendingCreation="/knownRouteForSpendingCreation"
      />
    </MemoryRouter>,
  );

  expect(container).toMatchSnapshot();
});
