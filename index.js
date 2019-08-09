const express = require('express');
const helmet = require('helmet');
const port = process.env.PORT || 8000;
const peopleRouter = require('./data/people/peopleRouter');
const choreRouter = require('./data/chores/choresRouters');
require('dotenv').config();

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/people', peopleRouter)
server.use('/chores', choreRouter)

server.get('/', (req, res) => {
  res.status(200).json({
    API: 'is running',
    secretMessage: process.env.SECRET 
  });
})

server.listen(port, () => console.log(`listening on port ${port}`));

