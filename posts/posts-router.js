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
  const id  =  req.params.id;
  const postFetch = Posts.findById(id);
  if(postFetch.length === 0) {
    console.log(postFetch.length)
    res.status(500).json({ error: "The post information could not be retrieved." })

  }else {
    Posts.findById(id)// is this check and if it doesn't happen then it goes to catch?
    .then(post => {
      if (post && post.length !== 0) {
        res.status(200).json(post);
      } else{
        console.log(postFetch.length)
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
    
  }
});

router.get('/:id/comments', (req, res) => {
  Posts.findPostComments(req.params.id)
  .then(post => {
    if (post && post.length !== 0) {
      res.status(200).json(post);
    } else{
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The comments information could not be retrieved." })
  })
});



router.post('/', (req, res) => {
  console.log(req.body)
  const body = req.body;
  console.log(body);

  if (!body.title || !body.contents) {//this if statement isn't working
    // console.log(error);
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else{

    Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
  }}

  
);

router.post('/:id/comments', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const postid = Posts.findById(id);
  
  if(postid !== 1 ){
    res.status(404).json({message: "The post with the specified ID does not exist."})

  } else if (!body.text) {
    // console.log(error);
    res.status(400).json({ errorMessage: "Please provide text for the comment." });
  } else{
    Posts.insertComment(req.body)
    .then(comment => {
      res.status(201).json(comment);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })

  }
}
);

router.delete('/:id', (req, res) => {
  const id  =  req.params.id

  Posts.remove(id)
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
  const id  =  req.params.id

  const changes = req.body;

  if(!changes.title || !changes.contents){
    res.status(400).json ({ errorMessage: "Please provide title and contents for the post." })
  } else {
    Posts.update(id, changes)
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

  }
});
