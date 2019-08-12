import React, { useState, useEffect } from 'react';
import axios from 'axios';
import People from '../components/People';

const PeopleList = () => {
  const [people, setPeople] = useState([]);

  let baseURL = 'https://webapi-challenge-penny.herokuapp.com';

  useEffect(() => {
    axios.get(baseURL + '/people')
      .then(response => {
        console.log('fetch people success: ', response);
        setPeople(response.data);
      })
      .catch(error => {
        console.log('fetch people error: ', error);
      })
  })

  return (
    <div>
      {people.map(item => <People key={`person${item.id}`} person={item}/>)}
    </div>
  )
}

export default PeopleList;

