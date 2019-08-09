const people = require('../data/people/peopleData');
const chores = require('../data/chores/choresData');

exports.checkPersonId = function(req, res, next) {
  let id = req.params.id;
  let person = people.filter(item => item.id === Number(id));
  if (person.length === 0) {
    res.status(404).json({ error: 'No person with such ID exists'});
  } else {
    req.id = Number(id);
    next();
  }
}

exports.checkChoreId = function(req, res, next) {
  let id = req.params.id;
  let chore = chores.filter(item => item.id === Number(id));
  if (chore.length === 0) {
    res.status(404).json({ error: 'No chore with such ID exists'});
  } else {
    req.id = Number(id);
    next();
  }
}