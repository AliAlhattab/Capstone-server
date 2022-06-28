const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile.js").development);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  const newPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    ...req.body,
    password: newPassword,
  };

  knex("usersinfo")
    .insert(newUser)
    .then((user) => {
      res.status(201).send({ success: true, message: "created user" });
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
        return res.status(400).send("invaild password");
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

module.exports = router;
