import React from 'react';
import { Query } from 'react-apollo';

import { UserProvider } from '../user/user-provider';

import { GetTagsQuery } from './tags-query';
import { TagType } from './tags-types';
import { Loading } from '../loading/loading';

export const Tags: React.FunctionComponent<{}> = _ => {
  return (
    <UserProvider.Consumer>
      {userId => (
        <React.Fragment>
          <h1>The tags are: </h1>
          <Query query={GetTagsQuery} variables={{ userId }}>
            {({ loading, data }) => {
              if (loading) return <Loading />;
              if (data) {
                const { tags } = data;
                return (
                  <div className="tags">
                    {tags.map((tag: TagType) => {
                      return (
                        <p
                          style={{ color: `${tag.colour}` }}
                          className="tags__tag"
                          key={tag.name}
                        >
                          {tag.name}
                        </p>
                      );
                    })}
                  </div>
                );
              }
              return null;
            }}
          </Query>
        </React.Fragment>
      )}
    </UserProvider.Consumer>
  );
};
export default Tags;
