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

  router.put('/edit/:id', (req, res) => {
    const {first_name, last_name, email, phone, about, github, linkedin} = req.body;
    const { id } = req.params;
  
    knex('usersinfo')
    .update({
   first_name: first_name,
   last_name: last_name,
   email: email,
   phone: phone,
   about: about,
   github: github,
   linkedin: linkedin
    })
    .where({id: id})
    .then(() => {
      res.status(204).send(`Profile with id: ${req.params.id} has been updated`)
    })
    .catch(err => {
      res.status(400).send({
        message: `Error updating profile id ${req.params.id}`
      })
    })
  })

  module.exports = router;