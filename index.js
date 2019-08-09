const express = require('express');
const helmet = require('helmet');
const port = process.env.PORT || 8000;

const server = express();

server.use(helmet());
server.use(express.json());

let people = [
  {
    id: 1,
    name: 'Frodo Baggins',
    chores: [
      {
        id: 1,
        description: 'take the ring to Mordor',
        notes: 'make your way to Mount Doom',
        assignedTo: 1, // the id of Frodo,
        completed: true
      },
      {
        id: 2,
        description: 'destroy the ring',
        notes: 'cast the ring into the fire inside Mount Doom',
        assignedTo: 1,
        completed: false
      },
    ]
  }
];

let nextId = 2;

server.get('/', (req, res) => {
  res.status(200).json('API in running');
})

//get all people
server.get('/people', (req, res) => {
  res.status(200).json(people);
})

//get specific person
server.get('/people/:id', checkPersonId, (req, res) => {
  if (req.id) {
    let person = people.filter(item => item.id === req.id);
    res.status(200).json(person);
  }
})

// get chores of a specific person
server.get('/people/:id/chores', checkPersonId, (req, res) => {
  if (req.id) {
    let completed = req.query.completed;
    let person = people.filter(item => item.id === req.id);
    if (completed === 'true' || completed === 'false') {
      let chores = person[0].chores.filter(item => item.completed.toString() === completed);
      res.status(200).json(chores);
    } else {
      res.status(200).json(person[0].chores);
    }
  }  
})

//get list of finished or unfinished chores for a specific person
server.get('/people/:id/chores', checkPersonId, (req, res) => {
  if (req.id) {
    let person = people.filter(item => item.id === req.id);
    res.status(200).json(person[0].chores);
  }  
})


//add a person
server.post('/people', (req, res) => {
  let person = req.body;
  if (!person.name) {
    res.status(400).json({ message: 'Name is required'});
  } else {
    person.id = getNextId();
    person.chores = [];
    people.push(person);
    res.status(201).json(people);
  }
})

//delete a person
server.delete('/people/:id', checkPersonId, (req, res) => {
  if (req.id) {
    people = people.filter(item => item.id !== req.id);
    res.status(200).json(people);
  }  
})

//edit a person
server.put('/people/:id', checkPersonId, (req, res) => {
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

//add a chore for a specific person
server.post('/people/:id/chores', checkPersonId, (req, res) => {
  if (req.id) {
    let body = req.body;
    if (!body.description) {
      res.status(400).json({ message: 'Description is required'});
    } else {
      let person = people.filter(item => item.id === req.id);
      body.notes = body.notes || '';
      body.assignedTo = req.id;
      body.id = person[0].chores.length + 1;
      body.completed = body.completed === 'true';
      person[0].chores.push(body);
      res.status(201).json(person[0]);
    }
  }
})

// middlewares and misc
function getNextId() {
  return nextId++;
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

server.listen(port, () => console.log(`listening on port ${port}`));

