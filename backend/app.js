const express = require('express');
const expressGraphQL = require('express-graphql');

const schema = require('./schema/schema')

const app = express();
const PORT = 4000

const {graphqlHTTP} = expressGraphQL;

app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(PORT,()=>{
    console.log(`Running on PORT ${PORT}`)
})