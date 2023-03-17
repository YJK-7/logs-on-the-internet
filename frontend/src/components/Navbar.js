import '../style/Navbar.css';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MonthDayViewColor from './MonthDayViewColor';


const Navbar = ({ userName, setUserInfo, setUserName, setDate, setEvents, eventOptions, setEventOptions, updateColor }) => {
  const name = userName? userName+"'s" : "" ;
  const login = useRef(null);

  const location = useLocation();
  // console.log('pathname', location.pathname);

  const logOut = () => {
    localStorage.clear();
    //do I have to clear session storage
    setUserInfo(undefined);
    setUserName(undefined);
    setEvents([]);

    login.current.click();//back to login page
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
        <>
        <MonthDayViewColor
            eventOptions={eventOptions}
            setEventOptions={setEventOptions}
            updateColor={updateColor}
          />
        <button onClick={today} className="logout">
          Today
        </button>
        </>
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