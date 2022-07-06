const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8080;
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const profileRoutes = require('./routes/profile');

app.use(express.json());
app.use(cors());
require('dotenv').config();


app.get('/', (req, res) => {
    res.json('Welcome to my server');
  });

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use('/profile', profileRoutes);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});