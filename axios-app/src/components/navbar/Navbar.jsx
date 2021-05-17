import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom'

const NavbarTop = ()=>{
    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link><Link to="/">Home</Link></Nav.Link>
      <Nav.Link><Link to="/movies">Movies</Link></Nav.Link>
      <Nav.Link><Link to="/books">Books</Link></Nav.Link>
      <Nav.Link><Link to="/persons">Persons</Link></Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
}

export default NavbarTop