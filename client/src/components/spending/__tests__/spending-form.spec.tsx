import 'babel-polyfill';
import React from 'react';
import { render } from 'react-testing-library';
import { MutationFn } from 'react-apollo';

import { TagValues, TagColours } from '../../tags/tags-types';

import { SpendingForm } from '../spending-form';

test('match the snapshot for the data passed into the spending form', async () => {
  const spendingCallback: MutationFn = () => new Promise(resolve => resolve());

  const props = {
    submitForm: () => {},
    spendingCallback,
    userId: '123',
    titleRef: React.createRef<HTMLInputElement>(),
    priceRef: React.createRef<HTMLInputElement>(),
    tagRef: React.createRef<HTMLSelectElement>(),
    spendingData: {
      title: 'knownTitle',
      price: 10.0,
      tags: [
        {
          id: '123',
          name: TagValues.ENTERTAINMENT,
          colour: TagColours.BLUE
        },
        {
          id: '2345',
          name: TagValues.FOOD,
          colour: TagColours.RED
        }
      ],
      selectedTag: '123'
    }
  };

  expect(render(<SpendingForm {...props} />)).toMatchSnapshot();
});
