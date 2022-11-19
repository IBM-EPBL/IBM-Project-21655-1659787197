import React from 'react';
import {Navbar,Container,NavDropdown,Nav, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink,Link} from 'react-router-dom';
import { signout } from '../../actions';


const Header =(props)=> {
  const auth=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  
  const logout = () => {
    dispatch(signout());
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
          <li>
          <span className="nav-link" onClick={logout}>
            Signout
          </span>
          </li>
        </Nav>
     
    );
  };
 
  
  const renderNonLoggedInLinks=()=>{
 return ( 
      <Nav>
      <li className="nav-item">
      <NavLink to="signin" className="nav-link">Signin</NavLink>
      </li>
      <li className="nav-item">
        
      <NavLink to="signup" className="nav-link">Signup</NavLink>
      </li>
       
      </Nav>);
  }
  return <div>
  <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{zIndex:1}}>
  <Container fluid >
  <Link to="/" className='navbar-brand '>Admin Dashboard</Link>

  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features"></Nav.Link>
      <Nav.Link href="#pricing"></Nav.Link>
      {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
    {auth.authenticate?renderLoggedInLinks():renderNonLoggedInLinks()}
   
  </Navbar.Collapse>
  </Container>
</Navbar>
  </div>;
}

export default Header;