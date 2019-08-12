import React from 'react';
import { Link } from 'react-router-dom';

const People = (props) => {
  return (
    <div>
      <div>{props.person.name}</div>
      <button>Edit</button> 
      <button>Delete</button>
      <Link to={`/people/${props.person.id}`}>See chores</Link> 
    </div>
  )
}

export default People;