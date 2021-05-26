import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RecipeCard } from '../recipe-card/recipe-card';
import { RecipeView } from '../recipe-view/recipe-view';
import { RegistrationView } from '../registration-view/registration-view';
import { CuisineView } from '../cuisine-view/cuisine-view';
import { MealTypeView } from '../mealtype-view/mealtype-view'; 
import { ProfileView } from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

  constructor(){
    super();
    // Initial state is set to null
    this.state = {
      recipes: [],
      user: null
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getRecipes(accessToken);
    }
  }

  getRecipes(token) {
    axios.get('https://jm-myrecipes-api.herokuapp.com/recipes', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        recipes: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getRecipes(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }


  render() {
    const { recipes, user } = this.state;
    return (
      <Router>
        <div className="text-right">
          <button className="btn btn-outline-dark mb-2 mt-2" onClick={() => { this.onLoggedOut() }}>Logout</button>
        </div>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (recipes.length === 0) return <div className="main-view" />;
            return recipes.map(m => (
              <Col md={3} className="mb-4" key={m._id}>
                <RecipeCard recipe={m} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
            <RegistrationView />
            </Col>
          }} />

          <Route path="/recipes/:recipeId" render={({ match, history }) => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (recipes.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <RecipeView recipe={recipes.find(m => m._id === match.params.recipeId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/cuisines/:name" render={({ match, history }) => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (recipes.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <CuisineView cuisines={recipes.find(m => m.Cuisine.Name === match.params.name).Cuisine} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/mealtypes/:name" render={({ match, history }) => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (recipes.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MealTypeView mealtypes={recipes.find(m => m.MealType.Name === match.params.name).MealType} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/profile" render={({ match, history }) => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (recipes.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <ProfileView user={username.find(m => m.user.Username === match.params.name).Username} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}

