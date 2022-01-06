import React from 'react'
import {ApolloClient,ApolloProvider,InMemoryCache, HttpLink, from} from '@apollo/client'
import {onError} from "@apollo/client/link/error";
import {Route,Switch,Redirect} from 'react-router-dom'

import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";

const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
            alert(`Graphql error ${message}`);
        });
    }
});

const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

function App() {
  return (
      <ApolloProvider client={client}>
          {/* <GetUsers /> */}
          <Switch>
              <Route path='/create-song' exact>
                  <SongCreate />
              </Route>
              <Route path='/' exact>
                  <SongList />
              </Route>
              <Redirect to='/' />
          </Switch>
      </ApolloProvider>
  );
}

export default App;
