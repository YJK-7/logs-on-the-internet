import './style/App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginSignup from './components/LoginSignup';
import MonthView from './components/MonthView';
import DayView from './components/DayView';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [userInfo, setUserInfo] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [date, setDate] = useState(new Date());
  
  
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      fetch("/user-info",{
        headers:{
          "id":localStorage.getItem("userid")
        }
      })
      .then(data => data.json())
      .then((userArr) => {
        setUserInfo(userArr[0]);
        setUserName(userArr[0]["first_name"]);
      })
    }
  },[])
  console.log("date",date)
  console.log("userName",userName)
  console.log("userInfo",userInfo)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar userName={userName}/>

        <Routes>
          <Route path="/" element={<LoginSignup setUserName={setUserName} setUserInfo={setUserInfo}/>}/>
          <Route path="/month" element={
            <MonthView
              userInfo={userInfo} 
              date={date}
              setDate={setDate}
            />
          }/>

          <Route path="/day/:day" element={<DayView date={date}/>}/>
        </Routes>
        {/* <button onClick={getUser}>
          User
        </button>
        {user ? 
        <div>
          Name: {user.firstName} <br/>
        </div> 
        : 
        <div></div> } */}
      </BrowserRouter>
    </div>
  );
}

export default App;
