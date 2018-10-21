import React from 'react';
import { render } from 'react-testing-library';

import { Error } from '../error';

test('Should render the error screen', () => {
  const errorComponent = render(<Error />);

  expect(errorComponent).toMatchSnapshot();
});
