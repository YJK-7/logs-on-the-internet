import '../style/Navbar.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({ userName, setUserInfo, setUserName }) => {
  const name = userName? userName+"'s" : "" ;
  const login = useRef(null);

  const logOut = () => {
    localStorage.clear();
    //do I have to clear session storage
    setUserInfo(undefined);
    setUserName(undefined);

    login.current.click();
  }

  return (
    <>
    <div className='nav-wrap'> 
      <h1 className="home-logo">{name} Journal</h1>
      {
        userName ? 
        <button onClick={logOut} className="logout-button">
          Logout
        </button>
        : ""
      }
    </div>
    <div className='hide'>
        <Link to={"/"} ref={login}>Hide</Link>
      </div>
    </>
  )
}

export default Navbar;