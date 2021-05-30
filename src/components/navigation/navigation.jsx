import React from 'react';

import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button';

export class Navigation extends React.Component {

  render() {
    const { onLogOut } = this.props;

    return (

      <Nav className="justify-content-center" activeKey="/" >
        <Nav.Item>
          <Nav.Link href="/">Recipes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/profile">Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item className="justify-content-end" >
        <Button variant="link" onClick={() => {onLogOut(null); }}>Logout</Button>
        </Nav.Item>
      </Nav>


    )
  }
}


      
        
      