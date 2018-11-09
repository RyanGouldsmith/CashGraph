import React from 'react';

export const Error = React.memo<{}>(() => {
  return (
    <React.Fragment>
      <h1>Sorry! That page does not exist</h1>
    </React.Fragment>
  );
});

export default Error;
