import 'babel-polyfill';
import React from 'react';
import { Router } from '../router';
import * as TestLibrary from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter } from 'react-router';

const { render } = TestLibrary;
test('Router should not render any child component for a non-existant root', () => {
  const routerOutput = render(
    <MockedProvider mocks={[]}>
      <MemoryRouter initialEntries={['/no-go']}>
        <Router />
      </MemoryRouter>
    </MockedProvider>,
  );

  expect(routerOutput).toMatchSnapshot();
});

test('Router should the dashboard component for root `/`', () => {
  const routerOutput = render(
    <MockedProvider mocks={[]}>
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>
    </MockedProvider>,
  );

  expect(routerOutput).toMatchSnapshot();
});
