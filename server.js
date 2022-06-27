const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const port = process.env.port || 8080;


app.use(express.json());
app.use(cors());



app.listen(port, () => {
    console.log(`Listening on ${port}`);
});