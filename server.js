const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());
require('dotenv').config();


app.get('/', (req, res) => {
    res.json('Welcome to my server');
  });

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});