const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js').development);

require('dotenv').config();

router.get('/', (req, res) => {
    res.json("you got the private route");
})

module.exports = router;