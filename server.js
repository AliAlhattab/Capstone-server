const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const port = process.env.PORT || 8080;
const expressSession = require('express-session');
const privateRoutes = require('./routes/private');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());
require('dotenv').config();


const knex = require('knex')(require('./knexfile.js').development);

app.get('/', (req, res) => {
    res.json('Welcome to my server');
  });

app.use('/private', privateRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});