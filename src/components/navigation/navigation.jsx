import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar';

export class Navigation extends React.Component {

  render () {
    const { user } = this.props;

    return (

      <Navbar bg="light" fixed="top" expand="lg">
        <Navbar.Brand href="#home">My Recipes App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">All Recipes</Nav.Link>
            <Nav.Link href="#link">Profile</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    )
  }
}