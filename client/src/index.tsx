import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Dashboard } from './components/dashboard/dashboard';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:3000/spending' }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Dashboard />
  </ApolloProvider>,
  document.getElementById('root'),
);
