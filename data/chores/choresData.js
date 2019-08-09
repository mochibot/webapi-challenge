const choresData = [
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
  {
    id: 3,
    description: 'new task',
    notes: 'cast the ring into the fire inside Mount Doom',
    assignedTo: 2,
    completed: false
  },
];

module.exports = choresData;