import React from 'react';

import { MutationFn } from 'react-apollo';

interface SpendingFormProps {
  submitForm: Function;
  spendingCallback: MutationFn;
  userId: String;
  titleRef: React.Ref<HTMLInputElement>;
  priceRef: React.Ref<HTMLInputElement>;
  tagRef: React.Ref<HTMLInputElement>;
  colourRef: React.Ref<HTMLInputElement>;
  spendingData: {
    title?: string;
    price?: number;
    tagName?: string;
    tagColour?: string;
  };
}

export const SpendingForm: React.SFC<SpendingFormProps> = ({
  submitForm,
  spendingCallback,
  userId,
  titleRef,
  priceRef,
  tagRef,
  colourRef,
  spendingData: { title = '', price = 0, tagName = '', tagColour = '' },
}) => (
  <form onSubmit={submitForm(spendingCallback, userId)}>
    <label htmlFor="title">Enter the item you purchased</label>
    <input id="title" placeholder="Shoes" type="text" ref={titleRef} defaultValue={title} />
    <label htmlFor="price">The price of the item</label>
    <input
      id="price"
      type="number"
      min="0"
      ref={priceRef}
      step="0.01"
      defaultValue={price.toFixed(2)}
    />
    <label htmlFor="tag">Type of Tag</label>
    <input id="tag" ref={tagRef} defaultValue={tagName} />
    <label htmlFor="tag-colour">Tag Colour</label>
    <input id="tag-colour" ref={colourRef} defaultValue={tagColour} />
    <button type="submit">submit</button>
  </form>
);
