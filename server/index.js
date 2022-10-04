const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const colors = require('colors');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const cors = require('cors');
const port = process.env.PORT;

const app = express();

// Connect to db
connectDB();
app.use(cors());

app.use(
    '/graphql', 
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development',
})
);

app.listen(port, console.log(`Server running on ${port}`));