const express = require('express');

const Posts = require('../data/db.js');

const router = express.Router();


module.exports = router;
//the router handles endpoints that begin with /api/posts

router.get('/', (req, res) => {
  Posts.find(req.query)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  });
});

router.get('/:id', (req , res) => {

});

router.get('/:id/comments', (req, res) => {

});

router.post('/', (req, res) => {

});

router.post('/:id/comments', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {
  
})
