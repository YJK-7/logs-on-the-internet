import './style/App.css';
import React, { useState } from 'react';
import MonthView from './components/MonthView';
import Navbar from './components/Navbar';
import DayView from './components/DayView';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date());

  const getUser = () => {
    return fetch("/testconnection")
    .then((data) => {
      return data.json()
    })
    .then((dataJs) => {
      return setUser(dataJs[0]);
    })
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path="/" element={
            <MonthView 
              date={date}
              setDate={setDate}
            />
          }/>

          <Route path="/day/:day" element={<DayView date={date}/>}/>
        </Routes>
        <button onClick={getUser}>
          User
        </button>
        {user ? 
        <div>
          Name: {user.firstName} <br/>
        </div> 
        : 
        <div></div> }
      </BrowserRouter>
    </div>
  );
}

export default App;
