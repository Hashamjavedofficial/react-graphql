const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();
const PORT = 4000

const {graphqlHTTP} = expressGraphQL;

app.use('/graphql',graphqlHTTP({
    graphiql: true
}))

app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`)
})