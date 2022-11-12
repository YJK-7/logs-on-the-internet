import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import "../style/LoginSignup.css";

const Signup = ({ setUserInfo, setUserName }) => {
  const [first, setFirst] = useState(undefined);
  const [last, setLast] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const linkRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();//?
    console.log(email,password,first,last)
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
        // console.log(userArr[0].id);
        localStorage.setItem('userid', userArr[0].id);
        linkRef.current.click();
        alert(`Sign up complete :D`)
      }) 
    }

  }

  const inputs = ["first","last","email","password"];

  const inputFields = (field) => {
    let toCap = field.replace(field[0],field[0].toUpperCase())
    const func = (e) => {
      return (field === "first" ? (setFirst(e))
        :field === "last" ? setLast(e)
        :field === "email" ? setEmail(e)
        :setPassword(e)
      )
    }

    let f;

    if (field === "first" || field === "last") {
      toCap+=" Name";
      f = "text";
    } else {
       f = field;
    }   
    return (
      <>
        <div className="input-box">
          <label className="lable" key={field}>
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
      </>
    )
  }

  return (
    <>
    

    
      <form onSubmit={handleSubmit} className="login-form">
        {inputs.map(inputFields)}
        {/* <label>
          First Name:
          <input 
            type="text" 
            name="first" 
            // value={first}
            placeholder="First Name"
            onChange={(e) => setFirst(e.target.value)}
          />
        </label>

        <label>
          Last Name:
          <input 
            type="text" 
            name="last" 
            // value={last}
            placeholder="Last Name"
            onChange={(e) => setLast(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input 
            type="text" 
            name="email" 
            // value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input 
            type="password" 
            name="password" 
            // value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label> */}

        <input type="submit" value="Submit" className='my-button'/>
      </form>
      
      <div className='hide'>
        <Link to={"/month"} ref={linkRef}>Hide</Link>
      </div>
    </>
  )
  
}

export default Signup;