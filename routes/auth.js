const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile.js").development);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post("/signup", (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  const newPassword = bcrypt.hashSync(password,10);
  const newUser = { 
    ...req.body,
    password: newPassword,
  };

  knex('usersinfo')
  .insert(newUser)
  .then(user => {
    res.status(201).send({success: true, message: 'created user'})
  })




  // knex
  //   .select("username")
  //   .from("usersinfo")
  //   .where("username", username)
  //   .then((result) => {
  //     if (!result.length) {
  //       knex("usersinfo")
  //         .insert(newUser)
  //         .into("usersinfo")
  //         .then(() => {
  //           knex("usersinfo")
  //             .then((data) => {
  //               res.status(200).json(data);
  //             })
  //             .catch((err) => {
  //               res.status(400).json(`could not sign up ${err}`);
  //             });
  //         });
  //     } else {
  //       res.status(400).send("Username already exists");
  //     }
  //   });

});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    knex('usersinfo')
    .where({username:username})
    .first()
    .then(user => {
      const isPassword = bcrypt.compareSync(password, user.password)
      if(!isPassword){
        return res.status(400).send("invaild password");
      }
      const token = jwt.sign({id: user.id, username: user.username},
        process.env.jwt_key, {expiresIn: '24h'}
        )
        res.json({
          token: token,
          name: user.first_name
        })
    })






    // knex
    // .select('username')
    // .from('usersinfo')
    // .where('username', username)
    // .then((result) => {
    //   if(result.length){
    //     knex
    //     .select('password')
    //     .from('usersinfo')
    //     .where('password', password)
    //     .then((result) => {
    //       if(result.length){

    //       } else {
    //         res.status(400).send('Incorrect Password')
    //       }
    //     })
    //   } else {
    //     res.status(400).send('User does not exist')
    //   }
    // })
});

module.exports = router;
