import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import axios from 'axios';

import { connect } from 'react-redux';

import { RecipeCard } from '../recipe-card/recipe-card';
import { Card } from 'react-bootstrap';

export function ProfileView(props) {
  
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const recipes = props.recipes;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  // const getUser = () => {
  //   axios.get(`https://jm-myrecipes-api.herokuapp.com/users/${user}`, {
  //   headers: { Authorization: `Bearer ${token}`} });
  // };

  React.useEffect(() => {
    // getUser();
    showFavorites();
  }, []);
  
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');


  const handleChange = (e) => {
    e.preventDefault();
    axios.put(`https://jm-myrecipes-api.herokuapp.com/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
      }, { 
        headers: { Authorization: `Bearer ${token}`} 
        }
      )
    .then(response => {
      const data = response.data;
      console.log(data); 
      localStorage.setItem('user', data.Username);
      window.open('/profile', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab   
    })
    .catch(e => {
      console.log('error updating the user-data')
    });
  };

  const deleteUser = (e) => {
    e.preventDefault();
    axios.delete(`https://jm-myrecipes-api.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('error deleting the user')
    });
  };

  const showFavorites = () => {
    console.log(recipes, favoriteRecipes, "recipes and favoriteRecipes from profileview");
    // let favoriteRecipes = props.user.favoriteRecipes;

    let matchingRecipes = recipes.filter((recipe) => {
      return favoriteRecipes.includes(recipe._id);
    });
    console.log(matchingRecipes, "matchingRecipes from profileview" );
    return matchingRecipes;
  }

  return (
    <Row className="main-view justify-content-center">
      <h1 className="mb-4 mt-4">{user}'s Profile</h1>
      <div className="w-100"></div>
      <Col sm={8} lg={7} >
        <Form>
          <h4>Change user details</h4>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Change username" onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Change password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" placeholder="Change email" onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleChange}>
            Submit
          </Button>
        </Form>
      </Col>
        <Col sm={4}  md={3}>
          <div >
            <h4>Delete user profile</h4>
          </div>
          
          <Button variant="danger" type="submit" onClick={deleteUser}>
            Delete
          </Button>
        </Col>

      <div className="w-100"></div>
      <h4 className="mb-4 mt-4">Your favorite recipes</h4>
        <Row className="main-view justify-content-md-center">
            {showFavorites().map(recipe => (
              <Col sm={6} md={4} className="mb-4" key={recipe._id}>
                <RecipeCard recipe={recipe} />
              </Col>
            ))}
        </Row>
    </Row>
  );
}

