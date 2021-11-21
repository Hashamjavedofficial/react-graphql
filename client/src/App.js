import React from 'react'
import ApolloClient from "apollo-boost";
import {ApolloProvider} from 'react-apollo'

import SongList from "./components/SongList";

const client = new ApolloClient({})

function App() {
  return (
    <ApolloProvider client={client}>
        <SongList />
    </ApolloProvider>
  );
}

export default App;
