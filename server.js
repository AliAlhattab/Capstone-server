const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const port = process.env.PORT || 8080;
const expressSession = require('express-session');


app.use(express.json());
app.use(cors());
require('dotenv').config();
app.use(expressSession());

const knex = require('knex')(require('./knexfile,js').development);

app.get('/', (req, res) => {
    res.send('Welcome to my server');
  });


app.listen(port, () => {
    console.log(`Listening on ${port}`);
});