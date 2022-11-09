import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
          "first":`${first}`,
          "last":`${last}`,
          "email":`${email}`, 
          "password":`${password}`}
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


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input 
            type="text" 
            name="first" 
            value={first}
            onChange={(e) => setFirst(e.target.value)}
          />
        </label>

        <label>
          Last Name:
          <input 
            type="text" 
            name="last" 
            value={last}
            onChange={(e) => setLast(e.target.value)}
          />
        </label>
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
      </form>
      
      <div className='hide'>
        <Link to={"/month"} ref={linkRef}>Hide</Link>
      </div>
    </>
  )
  
}

export default Signup;