import 'babel-polyfill';
import React from 'react';
import { render } from 'react-testing-library';
import { MutationFn } from 'react-apollo';

import { SpendingForm } from '../spending-form';

test('match the snapshot for the data passed into the spending form', async () => {
  const spendingCallback: MutationFn = () => new Promise(resolve => resolve());

  const props = {
    submitForm: () => {},
    spendingCallback,
    userId: '123',
    titleRef: React.createRef<HTMLInputElement>(),
    priceRef: React.createRef<HTMLInputElement>(),
    tagRef: React.createRef<HTMLInputElement>(),
    colourRef: React.createRef<HTMLInputElement>(),
    spendingData: {
      title: 'knownTitle',
      price: 10.0,
      tagName: 'knownTagName',
      tagColour: 'knownTagColour',
    },
  };

  expect(render(<SpendingForm {...props} />)).toMatchSnapshot();
});
