import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Link,useHistory} from 'react-router-dom'
import {getAccount} from '../../services/account'
import { useState } from 'react';

const NavbarTop = ()=>{
  const history = useHistory();

 const [accountName,getAccountName]= useState()

  getAccount()
  .then(function(r){
     getAccountName(r?.data.login)
    
  })


    return <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link><Link to="/">Početna</Link></Nav.Link>
      <Nav.Link><Link to="/movies">Filmovi</Link></Nav.Link>
      <Nav.Link><Link to="/books">Knjige</Link></Nav.Link>
      <Nav.Link><Link to="/people">Osobe</Link></Nav.Link>
      <Nav.Link>
      {accountName}
      </Nav.Link>
      <Nav.Link onClick={() => {
                    localStorage.clear();
                    history.push("/login");
                }}>Log out</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
}

export default NavbarTop