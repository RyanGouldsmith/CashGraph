import React from 'react';
import { Query } from 'react-apollo';

import { GetTagsQuery } from './tags-query';
import { TagType } from './tags-types';

export const Tags: React.SFC<{}> = _ => {
  return (
    <React.Fragment>
      <h1>The tags are: </h1>
      <Query query={GetTagsQuery}>
        {({ loading, data: { tags } }) => {
          if (loading) return <p className="tags__loading">Loading...</p>;
          return (
            <div className="tags">
              {tags.map((tag: TagType) => {
                return (
                  <p style={{ color: `${tag.colour}` }} className="tags__tag">
                    {tag.name}
                  </p>
                );
              })}
            </div>
          );
        }}
      </Query>
    </React.Fragment>
  );
};
export default Tags;
