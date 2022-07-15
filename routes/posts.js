const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile.js").development);

router.get("/", (req, res) => {
  
  knex
    .select(
      "posts.id as post_id",
      "posts.content",
      "posts.website",
      'posts.tech',
      "posts.updated_at",
      "usersinfo.id as user_id",
      "usersinfo.first_name",
      "usersinfo.last_name",
      "usersinfo.email",
      "usersinfo.phone"
    )
    .from("posts")
    .leftJoin("usersinfo", "posts.user_id", "usersinfo.id")
    .then((posts) => {
      res.status(200).json(posts);
    });
});

router.post('/', (req, res) => {

  const {user_id, content, website, tech} = req.body;

    knex('posts')
    .insert({
        user_id: user_id,
        content: content,
        website: website,
        tech: tech
    })
    .then(postId => {
        res.status(201).json({ newPostId: postId[0] });
    })
    .catch(() => {
        res.status(500).json({ message: 'Error creating a new post' });
      });
})


router.get('/:id', (req, res) => {
  knex
    .select(
      "posts.id as post_id",
      "posts.content",
      "posts.website",
      'posts.tech',
      "posts.updated_at",
      "usersinfo.id as user_id",
      "usersinfo.first_name",
      "usersinfo.last_name"
    )
    .from("posts")
    .leftJoin("usersinfo", "posts.user_id", "usersinfo.id")
    .where({'user_id': req.params.id})
    .then((posts) => {
      res.status(200).json(posts);
    });
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  knex
    .delete()
    .from("posts")
    .where({id: id})
    .then(() => {
      res.status(204).send(`Post with id: ${req.params.id} has been deleted`)
    })
    .catch(err => {
      res.status(400).send({
        message: `Error deleting post id ${req.params.id}`
      })
    })
})

router.put('/:id', (req, res) => {
  const {content, website, tech} = req.body;
  const { id } = req.params;

  knex('posts')
  .update({
    content: content,
    website: website,
    tech: tech,
  })
  .where({id: id})
  .then(() => {
    res.status(204).send(`Post with id: ${req.params.id} has been updated`)
  })
  .catch(err => {
    res.status(400).send({
      message: `Error updating post id ${req.params.id}`
    })
  })
})

router.get('/single/:id', (req, res) => {
  knex
    .select(
      "posts.content",
      "posts.website",
      'posts.tech'
    )
    .from("posts")
    .where({'posts.id': req.params.id})
    .then((posts) => {
      res.status(200).json(posts);
    })
})

module.exports = router;
