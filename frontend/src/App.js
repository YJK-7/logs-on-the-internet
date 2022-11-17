import './style/App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import MonthView from './components/MonthView';
import DayView from './components/DayView';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [userInfo, setUserInfo] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const headerObj = {
    "id":localStorage.getItem("userid")
  };

  const localStorageUser = localStorage.getItem("userid");
  //check for userid 
  useEffect(() => {
    if (localStorageUser) {
      fetch("/user-info",{
        headers:headerObj
      })
      .then(data => data.json())
      .then((userArr) => {
        if(userArr.length !== 0) {
          setUserInfo(userArr[0]);
          const userFirstName = userArr[0]["first_name"];
          setUserName(userFirstName.charAt(0).toUpperCase() + userFirstName.slice(1));
        }
      })
    }
  },[]);

  //fetch user related events
  useEffect(() => {
    const fetchEvents = async () => {
      if(localStorageUser) {
        const eventsData = await fetch ("/user-event", {
          headers:headerObj
        })
        const eventsArr = await eventsData.json();
        setEvents(eventsArr);
        //setevents regardless of if events is empty or not?
      }
    }
    fetchEvents()
    .catch(console.error);

  },[userInfo])

  
  // console.log("userName",userName, Boolean (userName))
  // console.log("userInfo",userInfo, Boolean (userInfo))

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar 
          userName={userName} 
          setUserInfo={setUserInfo} 
          setUserName={setUserName}
          setDate={setDate}
        />

        <Routes>
          <Route 
            path="/" 
            element={userInfo ? <Navigate to="/month"/> : <Login setUserName={setUserName} setUserInfo={setUserInfo}/>}
          />
          <Route path="/month" element={
            <MonthView
              userInfo={userInfo} 
              date={date}
              setDate={setDate}
              events={events}
              setEvents={setEvents}
            />
          }/>

          <Route path="/day/:day/*" element={
            <DayView
              events={events} 
              setEvents={setEvents}
            />
          }/>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
