import React from 'react';
import { render } from 'react-dom';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './components/router/router';
import { UserProvider } from './components/user/user-provider';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:3000/spending' }),
  cache: new InMemoryCache(),
});

render(
  <UserProvider.Provider value={process.env.TEST_USER}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  </UserProvider.Provider>,
  document.getElementById('root'),
);
