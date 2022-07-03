const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile.js").development);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require('../middleware/authenticate');

router.post("/signup", (req, res) => {
  const { password } = req.body;
  const newPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    ...req.body,
    password: newPassword,
  }
  knex("usersinfo")
    .where({ username: req.body.username })
    .first()
    .then((user) => {
      if (!user) {
        knex("usersinfo")
          .insert(newUser)
          .then((user) => {
            res.status(201).send({
              success: true,
              message: "User has successfully been created",
            });
          });
      } else {
        return res.status(400).send("Username Already Exists");
      }
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  knex("usersinfo")
    .where({ username: username })
    .first()
    .then((user) => {
      const isPassword = bcrypt.compareSync(password, user.password);
      if (!isPassword) {
        return res.status(400).send("Invalid Password");
      }
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.jwt_key,
        { expiresIn: "24h" }
      );
      res.json({
        token: token,
        name: user.first_name,
      });
    });
});

router.get('/profile', authenticate, (req, res) => {

  knex('usersinfo')
  .where({id: req.user.id})
  .first()
  .then((user) => {
   
    res.json(user);
  })
})


router.get('/profile/:id', authenticate, (req, res) => {

  knex('usersinfo')
  .where({id: req.user.id})
  .first()
  .then((user) => {
   
    res.json(user);
  })
})

module.exports = router;
