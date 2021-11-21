import React from 'react'
import {ApolloClient,ApolloProvider,InMemoryCache, HttpLink, from} from '@apollo/client'
import {onError} from "@apollo/client/link/error";

import SongList from "./components/SongList";

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
          {" "}
          {/* <GetUsers /> */}
          <SongList />
      </ApolloProvider>
  );
}

export default App;
