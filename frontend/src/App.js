import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  const getUser = () => {
    return fetch("/api")
    .then((data) => {
      return data.json()
    })
    .then((dataJs) => {
      return setUser(dataJs[0]);
    })
  }

  return (
    <div className="App">
      <button onClick={getUser}>
        User
      </button>
      {user ? 
      <div>
        Name: {user.firstName} <br/>
      </div> 
      : 
      <div></div> }
    </div>
  );
}

export default App;
