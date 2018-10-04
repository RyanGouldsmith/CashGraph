import * as React from 'react';
import { graphql } from 'react-apollo';

import { GetTagsQuery } from './tags-query';
import { TagsQuery } from './tags-types';

const Tags = graphql<{}, TagsQuery>(GetTagsQuery);

export default Tags(({ data }) => {
  const { loading, tags = [] } = data;
  return (
    <div className="tags">
      <h1>The tags are: </h1>
      {loading && <p className="tags__loading">Loading...</p>}
      {tags.map(tag => {
        return (
          <p style={{ color: `${tag.colour}` }} className="tags__tag">
            {tag.name}
          </p>
        );
      })}
    </div>
  );
});
