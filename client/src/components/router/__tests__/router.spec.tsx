import 'babel-polyfill';
import React from 'react';
import { Router } from '../router';
import { render, wait, cleanup } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter } from 'react-router';

afterEach(cleanup);

test('Router should not render any child component for a non-existant path', async () => {
  const routerOutput = render(
    <MockedProvider mocks={[]}>
      <MemoryRouter initialEntries={['/no-go']}>
        <Router />
      </MemoryRouter>
    </MockedProvider>,
  );

  await wait(() => {
    expect(routerOutput).toMatchSnapshot();
  });
});

test('Router should render the dashboard component for path `/`', async () => {
  const routerOutput = render(
    <MockedProvider mocks={[]}>
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>
    </MockedProvider>,
  );

  await wait(() => {
    expect(routerOutput).toMatchSnapshot();
  });
});

test('Router should render the Spending component for path `/spending`', async () => {
  const routerOutput = render(
    <MockedProvider mocks={[]}>
      <MemoryRouter initialEntries={['/spending']}>
        <Router />
      </MemoryRouter>
    </MockedProvider>,
  );

  await wait(() => {
    expect(routerOutput).toMatchSnapshot();
  });
});
