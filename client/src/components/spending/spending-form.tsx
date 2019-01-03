import React from 'react';
import { MutationFn } from 'react-apollo';

import { TagType } from '../tags/tags-types';

interface SpendingFormProps {
  submitForm: Function;
  spendingCallback: MutationFn;
  userId: String;
  titleRef: React.Ref<HTMLInputElement>;
  priceRef: React.Ref<HTMLInputElement>;
  tagRef: React.Ref<HTMLSelectElement>;
  spendingData: {
    title?: string;
    price?: number;
    tags?: Array<TagType>;
    selectedTag?: string;
  };
}

export const SpendingForm: React.SFC<SpendingFormProps> = ({
  submitForm,
  spendingCallback,
  userId,
  titleRef,
  priceRef,
  tagRef,
  spendingData: { title = '', price = 0, tags = [], selectedTag = '' }
}) => (
  <form onSubmit={submitForm(spendingCallback, userId)}>
    <label htmlFor="title">Enter the item you purchased</label>
    <input
      id="title"
      placeholder="Shoes"
      type="text"
      ref={titleRef}
      defaultValue={title}
    />
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
    <select ref={tagRef} id="tag">
      {tags.map(tag => (
        <option value={tag.id} selected={tag.id === selectedTag}>
          {tag.name}
        </option>
      ))}
    </select>
    <button type="submit">submit</button>
  </form>
);
