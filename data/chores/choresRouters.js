const express = require('express');
const { checkPersonId, checkChoreId } = require('../../middlewares/middlewares');
const router = express.Router();
let chores = require('./choresData');


//get all chores, and if user input query of true or false, return finished or unfinished chores, respectively
router.get('/', (req, res) => {
  let completed = req.query.completed;
  if (completed === 'true' || completed === 'false') {
    let fileredChores = chores.filter(item => item.completed.toString() === completed);
    res.status(200).json(fileredChores);
  } else {
    res.status(200).json(chores);
  }
})

//get specific chore
router.get('/:id', checkChoreId, (req, res) => {
  if (req.id) {
    let chore = chores.filter(item => item.id === req.id);
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

module.exports = router;