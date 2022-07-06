
const postData = require('../seed_data/posts_data');

exports.seed = function(knex) {
  return knex('posts')
  .del()
  .then(function () {
    return knex('posts').insert(postData);
  })
};
