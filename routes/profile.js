const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile.js").development);
const authenticate = require("../middleware/authenticate");



router.get('/', authenticate, (req, res) => {

    knex('usersinfo')
    .where({id: req.user.id})
    .first()
    .then((user) => {
     
      res.json(user);
    })
  })
  
  
  router.get('/:id',  (req, res) => {
  
    knex('usersinfo')
    .where({'id': req.params.id})
    .then((user) => {
      res.status(200).json(user);
    })
  })

  module.exports = router;