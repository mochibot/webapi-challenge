const express = require('express');
const router = express.Router();
let people = require('./peopleData');
let chores = require('../chores/choresData');
let nextUserId = 3;
let nextChoreId = 4;

//get all people
router.get('/', (req, res) => {
  res.status(200).json(people);
})

//get specific person and and list of chores for that specific person
router.get('/:id', checkPersonId, (req, res) => {
  if (req.id) {
    let person = [...people].find(item => item.id === req.id);
    let choresForThisPerson = chores.filter(item => item.assignedTo === req.id);
    person = {
      ...person,
      chores: choresForThisPerson
    }
    res.status(200).json(person);
  }
})

//add a person
router.post('/', (req, res) => {
  let person = req.body;
  if (!person.name) {
    res.status(400).json({ message: 'Name is required'});
  } else {
    person.id = getNextPeopleId();
    people.push(person);
    res.status(201).json(people);
  }
})

//add a new chore for a specific person
router.post('/:id', checkPersonId, (req, res) => {
  if (req.id) {
    let body = req.body;
    if (!body.description) {
      res.status(400).json({ message: 'Description is required'});
    } else {
      body.notes = body.notes || '';
      body.assignedTo = req.id;
      body.id = getNextChoreId();
      body.completed = body.completed === 'true';
      chores.push(body);
      res.status(201).json(chores);
    }
  }
})

//delete a person
router.delete('/:id', checkPersonId, (req, res) => {
  if (req.id) {
    people = people.filter(item => item.id !== req.id);
    res.status(200).json(people);
  }  
})

//edit a person
router.put('/:id', checkPersonId, (req, res) => {
  if (req.id) {
    let person = req.body;
    if (!person.name) {
      res.status(400).json({ message: 'Name is required'});
    } else {
      people.map(item => {
        if (item.id === req.id) {
          item.name = person.name;
          return item;
        } else {
          return item;
        }
      })
      res.status(200).json(people);
    }
  }  
})

//misc function and custom middleware

function getNextPeopleId() {
  return nextUserId++;
};

function getNextChoreId() {
  return nextChoreId++;
};

function checkPersonId(req, res, next) {
  let id = req.params.id;
  let person = people.filter(item => item.id === Number(id));
  if (person.length === 0) {
    res.status(404).json({ error: 'No person with such ID exists'});
  } else {
    req.id = Number(id);
    next();
  }
}

module.exports = router;