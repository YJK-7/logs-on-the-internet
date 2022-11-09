import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import "../style/LoginSignup.css";

const LoginSignup = ({ setUserName, setUserInfo }) => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [view, setView] = useState("login")
  const linkRef = useRef(null);
  console.log(view)

  const handleSubmit = (event) => {
    event.preventDefault();//?
    // console.log(email,password)
    if(email && password) {
      return fetch("/login", {
        headers:{"email":`${email}`, "password":`${password}`}
      })
      .then((data) => data.json())
      .then((userArr) => {
        //returns [{user info}]
        if(userArr.length !== 0) {
          setUserInfo(userArr[0]); 
          setUserName(userArr[0]["first_name"]);
          linkRef.current.click();
        } else {
          alert(`User does not exists! Please sign in.`)
        }
      }) 
    } else {
      return (!email ? alert(`Please enter your email`) : alert(`Please enter your password`));
    }
  }
  return (
    <>
    <div className='login'>
    {
      view === "login" ? 
      (<form onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            type="text" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input 
            type="text" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>):
      (<Signup setUserInfo={setUserInfo} setUserName={setUserName} />)
    }

      <button onClick={()=>setView("signup")}> 
        Sign Up
      </button>
    
    </div>
    <div className='hide'>
        <Link to={"/month"} ref={linkRef}>Hide</Link>
    </div>
    </>
  )
}

export default LoginSignup;