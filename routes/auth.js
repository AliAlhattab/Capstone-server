const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile.js').development);

router.post('/signup', (req, res) => {
    const { first_name, last_name, username, password } = req.body;
    const newUser = {first_name, last_name, username, password};
    knex.insert(newUser).into("usersinfo").then(() => {
        knex('usersinfo')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json(`could not sign up ${err}`)
        })
    })
})

router.post('/login', (req, res) => {
  
    
})


module.exports = router;