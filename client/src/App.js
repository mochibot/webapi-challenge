import React from 'react';
import { Route } from 'react-router-dom';
import PeopleList from './pages/PeopleList';
import './App.css';


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Chores app
      </header>
      <Route exact path='/people' component={PeopleList} />
    </div>
  );
}

export default App;
