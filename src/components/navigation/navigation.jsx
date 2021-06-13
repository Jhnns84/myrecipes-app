import React from 'react';

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';

import './navigation.scss';

export class Navigation extends React.Component {

  render() {
    const { onLogOut } = this.props;

    return (

      // <Nav className="justify-content-center navbar" activeKey="/" >
      //   <Nav.Item class="col-md-4">
      //     <Nav.Link href="/">Recipes</Nav.Link>
      //   </Nav.Item>
      //   <Nav.Item class="col-md-4">
      //     <Nav.Link href="/profile">Profile</Nav.Link>
      //   </Nav.Item>

      // </Nav>

      <Navbar expand="md" className="rounded navbar" >
        <Navbar.Brand href="#home">MyRecipes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Recipes</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
              <Button variant="link" onClick={() => {onLogOut(null); }}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>


    )
  }
}


      
        
      