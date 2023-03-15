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
  const [eventOptions, setEventOptions] = useState([]);
  const [updateColor, setUpdateColor] = useState([]);
  
  const localStorageUser = localStorage.getItem("userid");
  const headerObj = {
    "id":localStorageUser
  };
  
  //check for userid and send back user info
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

  // console.log(headerObj,userInfo);

  //fetch user related events
  useEffect(() => {
    // console.log("🌟");
    const fetchEvents = async () => {
      if(localStorageUser) {
        const eventsData = await fetch ("/user-event", {
          headers:headerObj
        })
        const eventsArr = await eventsData.json();
        setEvents(eventsArr);
        //setevents regardless of if events is empty
      }
    }
    fetchEvents()
    .catch(console.error);

  },[userInfo])

  //initial load event_types
  useEffect(()=>{
    const loadEventType = async () => {
      if(localStorageUser) {
        const fetchType = await fetch("/event-type", {
          method:"GET",
          headers:headerObj
        })
        const eventTypes = await fetchType.json();
        setEventOptions(eventTypes);
      }
    }
    loadEventType()
    .catch(console.error);
  },[userInfo])

  // get update event colors
  useEffect(()=> {
    if(eventOptions.length !== 0){
      setUpdateColor(eventOptions)
    }
  }, [eventOptions])

  window.onbeforeunload = function() {
    localStorage.clear();
 }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar 
          userName={userName} 
          setUserInfo={setUserInfo} 
          setUserName={setUserName}
          setDate={setDate}
          setEvents={setEvents}
          eventOptions={eventOptions}
          setEventOptions={setEventOptions}
          updateColor={updateColor}
        />

        <Routes>
          <Route 
            path="/" 
            element={userInfo ? <Navigate to="/month"/> : <Login setUserName={setUserName} setUserInfo={setUserInfo}/>}
          />
          <Route path="/month" element={
            <MonthView
              events={events}
              date={date}
              setDate={setDate}
              updateColor={updateColor}
            />
          }/>

          <Route path="/day/:day/*" element={
            <DayView
              events={events} 
              setEvents={setEvents}
              eventOptions={eventOptions}
              updateColor={updateColor}
            />
          }/>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
