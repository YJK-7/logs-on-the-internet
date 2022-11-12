import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import "../style/LoginSignup.css";

const Login = ({ setUserName, setUserInfo }) => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [view, setView] = useState("login")
  const linkRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();//?
    if(email && password) {
      return fetch("/login", {
        headers:{
          "email": email, 
          "password": password
        }
      })
      .then((data) => data.json())
      .then((userArr) => {
        //returns [{user info}]
        if(userArr.length !== 0) {
          setUserInfo(userArr[0]); 
          setUserName(userArr[0]["first_name"]);
          localStorage.setItem('userid', userArr[0].id);
          linkRef.current.click();
        } else {
          alert(`User does not exists! Please sign in.`)
        }
      }) 
    } else {
      return (!email ? alert(`Please enter your email`) : alert(`Please enter your password`));
    }
  }
  const inputs = ["email","password"];

  const inputFields = (field) => {
    const toCap = field.replace(field[0],field[0].toUpperCase())
    const func = (e) => {
      return (field === "email" ? setEmail(e): setPassword(e))
    }    
    // const func = (val) => {
    //   return this[`set${toCap}`](val);
    // }

    // console.log(this["setEmail"]("ji"))
    // wor.replace(wor[0], wor[0].toUpperCase())
    return (
      <>
        <div className="input-box">
          <label className="lable">
            {`${toCap}:`}
          </label>
          <input
            className='input-field' 
            type={field}
            name={field}
            placeholder={toCap} 
            onChange={(e) => func(e.target.value)}
          />
        </div>
      </>
    )
  }

  return (
    <>
    <div className='login'>
    {view === "login" ? 
      (<>
      <form onSubmit={handleSubmit} className="login-form">
        {inputs.map(inputFields)}
        <input type="submit" value="Submit" className='my-button'/>
      </form>
      <button onClick={()=>setView("signup")} className="my-button"> 
        Sign Up
      </button>
      </>)
      :(<>
      <Signup setUserInfo={setUserInfo} setUserName={setUserName} />
      <button onClick={()=>setView("login")} className="my-button"> 
        Log in
      </button>
      </>)
    }    
    </div>
    <div className='hide'>
        <Link to={"/month"} ref={linkRef}>Hide</Link>
    </div>
    </>
  )
}

export default Login;