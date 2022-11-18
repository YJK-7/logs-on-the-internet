import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../style/LoginSignup.css";

const Signup = ({ setUserInfo, setUserName }) => {
  const [first, setFirst] = useState(undefined);
  const [last, setLast] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const toMonthView = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();//?
    // console.log(email,password,first,last)
    if(email && password && first && last) {
      return fetch("/signup", {
        method:"POST",
        headers:{
          "first": first,
          "last": last,
          "email": email, 
          "password": password
        }
      })
      .then((data) => data.json())
      .then((userArr) => {
        //returns [{user info}]
        setUserInfo(userArr[0]); 
        setUserName(userArr[0]["first_name"]);
        localStorage.setItem('userid', userArr[0].id);
        toMonthView.current.click();
        alert(`Sign up complete :D`)
      }) 
    }

  }

  const inputs = ["first","last","email","password"];

  const inputFields = (field) => {
    let toCap = field.replace(field[0],field[0].toUpperCase())
    let f;

    if (field === "first" || field === "last") {
      toCap+=" Name";
      f = "text";
    } else {
      f = field;
    }  
    
    const func = (e) => {
      switch(field){
        case "first": setFirst(e);
          break;
        case "last": setLast(e);
          break;
        case "email": setEmail(e);
          break;
        case "password": setPassword(e);
          break;
      }
    }

    return (
      <div className="input-box" key={toCap+"div"}>
        <label className="lable">
          {`${toCap}:`}
        </label>
        <input
          className='input-field' 
          type={f}
          name={field}
          placeholder={toCap} 
          onChange={(e) => func(e.target.value)}
        />
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        {inputs.map(inputFields)}
        <input type="submit" value="Submit" className='my-button'/>
      </form>
      
      <div className='hide'>
        <Link to={"/month"} ref={toMonthView}>Hide</Link>
      </div>
    </>
  )
  
}

export default Signup;