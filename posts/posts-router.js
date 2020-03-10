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
  Posts.findById(req.params.id)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else{
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
});

router.get('/:id/comments', (req, res) => {

});

router.post('/', (req, res) => {

  Posts.add(req.body)
  .then(post => {
    res.status(201).json(hub);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the post to the database" })
  })
});

router.post('/:id/comments', (req, res) => {

});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
  .then(count => {
    if(count > 0) {
      res.status(200).json({ message: "Post has been removed"});
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The post could not be removed" });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Posts.update(req.params.id, changes)
  .then(post => {
    if(post) {
      res.status(200).json(post);
    }else{
      res.status(404).json ({ message: "The post with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The post information could not be modified." });
  });
});
