import 'babel-polyfill';
import React from 'react';
import { render, wait, cleanup } from 'react-testing-library';

import { Loading } from '../loading';

afterEach(cleanup);

test('should match the snapshot for Loading', async () => {
  const { container } = render(<Loading />);

  await wait(() => {
    expect(container).toMatchSnapshot();
  });
});
