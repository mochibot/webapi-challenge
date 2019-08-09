const express = require('express');
const router = express.Router();
let chores = require('./choresData');


//get all chores, and if user input query of true or false, return finished or unfinished chores, respectively
router.get('/', (req, res) => {
  let completed = req.query.completed;
  if (completed === 'true' || completed === 'false') {
    let filteredChores = [...chores].filter(item => item.completed.toString() === completed);
    res.status(200).json(filteredChores);
  } else {
    res.status(200).json(chores);
  }
})

//get specific chore
router.get('/:id', checkChoreId, (req, res) => {
  if (req.id) {
    let chore = [...chores].find(item => item.id === req.id);
    res.status(200).json(chore);
  }
})


//delete a chore
router.delete('/:id', checkChoreId, (req, res) => {
  if (req.id) {
    chores = chores.filter(item => item.id !== req.id);
    res.status(200).json(chores);
  }
})

//update a chore
router.put('/:id', checkChoreId, (req, res) => {
  if (req.id) {
    let body = req.body;
    if (!body.description) {
      res.status(400).json({ message: 'Description is required'});
    } else {
      chores.map(item => {
        if (item.id === req.id) {
          item.description = body.description;
          item.notes = body.notes || '';
          item.completed = item.completed === 'true';
          return item;
        } else {
          return item;
        }
      })
      res.status(201).json(chores);
    }
  }
})

//custom middleware
function checkChoreId(req, res, next) {
  let id = req.params.id;
  let chore = chores.filter(item => item.id === Number(id));
  if (chore.length === 0) {
    res.status(404).json({ error: 'No chore with such ID exists'});
  } else {
    req.id = Number(id);
    next();
  }
}

module.exports = router;