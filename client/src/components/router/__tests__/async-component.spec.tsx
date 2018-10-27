import 'babel-polyfill';
import React from 'react';
import { cleanup, render, wait } from 'react-testing-library';

import { AsyncComponent } from '../async-component';

afterEach(cleanup);

test('Should render a component based on a promise', async () => {
  const loader = () =>
    Promise.resolve({
      'a-component': () => <div>A Test</div>,
    });
  const AysncComp = AsyncComponent(loader, 'a-component');
  const renderedAsyncComp = render(<AysncComp />);

  await wait(() => {
    expect(renderedAsyncComp).toMatchSnapshot();
  });
});

test('Should return null when the component name does not match the loader', async () => {
  const loader = () =>
    Promise.resolve({
      'A-Component': () => <div>A Test</div>,
    });
  const AysncComp = AsyncComponent(loader, 'NotHere');
  const renderedAsyncComp = render(<AysncComp />);

  await wait(() => {
    expect(renderedAsyncComp).toMatchSnapshot();
  });
});
