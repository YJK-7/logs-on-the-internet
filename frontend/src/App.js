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
  const [events, setEvents] = useState(undefined);

  // need to figure out how to date when adding events
  // then figure out a way to store events by month
  // then make fetchEvents only fetch events from that month
  // using DayEvents, pass only events relevant to that day into dayview

  // const [DayEvents, setDayEvents] = useState(undefined);

  // console.log("today💛",date, date.getMonth()+1, date.getFullYear())
  // date: Thu Nov 10 2022 11:54:01 GMT+0900 (Japan Standard Time) 
  // date.getMonth()+1: 11
  // date.getFullYear(): 2022
  
  // console.log("💚",events)
  
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      fetch("/user-info",{
        headers:{
          "id":localStorage.getItem("userid")
        }
      })
      .then(data => data.json())
      .then((userArr) => {
        if(userArr.length !== 0) {
          setUserInfo(userArr[0]);
          setUserName(userArr[0]["first_name"]);
        }
      })
    }
  },[]);

  useEffect(() => {
    const fetchEvents = async () => {
      if(userInfo) {
        const eventsData = await fetch ("/user-event", {
          headers:{
            id: userInfo["id"]
          }
        })
        const eventsArr = await eventsData.json();
        setEvents(eventsArr);
      }
    }

    fetchEvents()
    .catch(console.error);

  },[userInfo])

  // useEffect(() => {

  // },[events])



  
  // console.log("userName",userName, Boolean (userName))
  // console.log("userInfo",userInfo, Boolean (userInfo))

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar 
          userName={userName} 
          setUserInfo={setUserInfo} 
          setUserName={setUserName}
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

          <Route path="/day/:day" element={
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
