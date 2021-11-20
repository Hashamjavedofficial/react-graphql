const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://localhost:27017/graphql-practice';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);


app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));


mongoose.connection
    .once('open', () => {
      
      console.log('Connected to MongoLab instance.')
    
    }).on('error', error => console.log('Error connecting to MongoLab:', error));


module.exports = app;
