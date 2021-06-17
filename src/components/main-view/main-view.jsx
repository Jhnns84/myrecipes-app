import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setRecipes, setUser, setFavorites } from '../../actions/actions';

import RecipesList from '../recipes-list/recipes-list';

import { LoginView } from '../login-view/login-view';
import { RecipeView } from '../recipe-view/recipe-view';
import { RegistrationView } from '../registration-view/registration-view';
import { CuisineView } from '../cuisine-view/cuisine-view';
import { MealTypeView } from '../mealtype-view/mealtype-view'; 
import { ProfileView } from '../profile-view/profile-view';
import { Navigation } from '../navigation/navigation';

import './main-view.scss';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner'

class MainView extends React.Component {

  constructor(){
    super();
    // Initial state is set to null
    this.state = {
      // recipes: [],
      // user: null
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser({
        user: localStorage.getItem('user'),
        // favoriteRecipes: localStorage.getItem('favoriteRecipes')
      });

      this.getRecipes(accessToken);
    }
  }

  // getFavorites() {
  //   this.props.setFavorites({
  //     favoriteRecipes: authData.user.FavoriteRecipes
  //   });
  // }

  getRecipes(token) {
    axios.get('https://jm-myrecipes-api.herokuapp.com/recipes', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setRecipes(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    this.props.setUser({
      user: authData.user,
      // user: authData.user.Username,
      // favoriteRecipes: authData.user.FavoriteRecipes
    });

    console.log(authData, " is authdata");

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('userData', authData.user);
    // localStorage.setItem('favoriteRecipes', JSON.stringify(authData.user.FavoriteRecipes));
    // localStorage.setItem('favoriteRecipes', authData.user.FavoriteRecipes);
    this.getRecipes(authData.token);
    this.props.setFavorites({
      favoriteRecipes: authData.user.FavoriteRecipes
    });
    console.log(favoriteRecipes, "from onLoggedIn");
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser(null);
  }


  render() {
    let { recipes, user, favoriteRecipes } = this.props;

    return (
      <Router>
        <Row className="main-view justify-content-md-center poppins">
          
          <Route exact path="/" render={() => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (recipes.length === 0) return (
              <>
              <Col md={12}>
                <Navigation onLogOut={() => { this.onLoggedOut() }} />
              </Col>
              <Row className="top-padding">
                <Spinner animation="border" role="status" style={{ margin: '6em' }}>
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </Row>
              </>
            )
            
            ;
            if (user) return (
              <>

                <Col md={12}>
                  <Navigation onLogOut={() => { this.onLoggedOut() }} />
                </Col>
                <Row className="top-padding">
                  <RecipesList recipes={recipes}/>
                </Row>
              </>
            )
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
            if (user) return ( 
              <>
                <Col md={12}>
                  <Navigation onLogOut={() => { this.onLoggedOut() }} />
                </Col>
                <Col  className="top-padding" md={10}>
                  <RecipeView recipe={recipes.find(recipe => recipe._id === match.params.recipeId)} onBackClick={() => history.goBack()} />
                </Col>
              </>
            )
          }} />

          <Route path="/cuisines/:name" render={({ match, history }) => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (recipes.length === 0) return <div className="main-view" />;
            if (user) return ( 
              <>
                <Col md={12}>
                  <Navigation onLogOut={() => { this.onLoggedOut() }} />
                </Col>
                <Col className="top-padding" md={8}>
                  <CuisineView cuisines={recipes.find(recipe => recipe.Cuisine.Name === match.params.name).Cuisine} onBackClick={() => history.goBack()} />
                </Col>
              </>
            )
          }} />

          <Route path="/mealtypes/:name" render={({ match, history }) => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (recipes.length === 0) return <div className="main-view" />;
            if (user) return ( 
              <>
                <Col md={12}>
                <Navigation onLogOut={() => { this.onLoggedOut() }} />
                </Col>
                <Col className="top-padding" md={8}>
                  <MealTypeView mealtypes={recipes.find(recipe => recipe.MealType.Name === match.params.name).MealType} onBackClick={() => history.goBack()} />
                </Col>
              </>
            )
          }} />

          <Route path="/profile" render={({ match, history }) => {
            if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (recipes.length === 0) return <div className="main-view" />;
            if (user) return (
              <>
                <Col md={12}>
                <Navigation onLogOut={() => { this.onLoggedOut() }} />
                </Col>
                <Col className="top-padding">
                  <ProfileView user={user} recipes={recipes} favoriteRecipes={favoriteRecipes} />
                </Col>
              </>
            )
          }} />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    recipes: state.recipes,
    user: state.user,
    favoriteRecipes: state.favoriteRecipes
  }
}

export default connect(mapStateToProps, { setRecipes, setUser, setFavorites } )(MainView);

