import '../style/Navbar.css';

const Navbar = ({userName}) => {
  const name = userName? userName+"'s" : "" ;
  return (
    <>
    <h1 className="home-logo">{name} Journal</h1>
    </>
  )
}

export default Navbar;