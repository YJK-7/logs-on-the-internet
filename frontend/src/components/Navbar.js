import '../style/Navbar.css';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';


const Navbar = ({ userName, setUserInfo, setUserName, setDate }) => {
  const name = userName? userName+"'s" : "" ;
  const login = useRef(null);

  const location = useLocation();
  // console.log('pathname', location.pathname);


  const logOut = () => {
    localStorage.clear();
    //do I have to clear session storage
    setUserInfo(undefined);
    setUserName(undefined);

    login.current.click();
  }

  const today = () => {
    setDate(new Date());
  };

  return (
    <>
    <div className='nav-wrap'> 
      <h1 className="home-logo">{name} Journal</h1>
      <div className='nav-buttons'>
      {
        location.pathname === "/month"?
        <button onClick={today} className="logout">
          Today
        </button>
        :""
      }
      {
        userName ? 
        <button onClick={logOut} className="logout">
          Logout
        </button>
        : ""
      }
      </div>

    </div>
    <div className='hide'>
        <Link to={"/"} ref={login}>Hide</Link>
      </div>
    </>
  )
}

export default Navbar;