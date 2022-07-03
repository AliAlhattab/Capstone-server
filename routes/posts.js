const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile.js").development);
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  knex
    .select(
      "posts.id as post_id",
      "posts.content",
      "posts.updated_at",
      "usersinfo.id as user_id",
      "usersinfo.first_name",
      "usersinfo.last_name"
    )
    .from("posts")
    .leftJoin("usersinfo", "posts.user_id", "usersinfo.id")
    .then((posts) => {
      res.status(200).json(posts);
    });
});

router.post('/', (req, res) => {

    knex('posts')
    .insert({
        user_id: req.user.id,
        content: req.body.content
    })
    .then(postId => {
        res.status(201).json({ newPostId: postId[0] });
    })
    .catch(() => {
        res.status(500).json({ message: 'Error creating a new post' });
      });
})

module.exports = router;
