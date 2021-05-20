import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { RecipeCard } from '../recipe-card/recipe-card';
import { RecipeView } from '../recipe-view/recipe-view';

export class MainView extends React.Component {

  constructor(){
    super();
    // Initial state is set to null
    this.state = {
      recipes: [],
      selectedRecipe: null,
      user: null
    };
  }

  componentDidMount(){
    axios.get('https://jm-myrecipes-api.herokuapp.com/recipes')
      .then(response => {
        this.setState({
          recipes: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*When a recipe is clicked, this function is invoked and updates the state of the `selectedRecipe` *property to that recipe*/

  setSelectedRecipe(newSelectedRecipe) {
    this.setState({
      selectedRecipe: newSelectedRecipe
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  /* When a user successfully registers, this function updates the `user` property in state to that *particular user*/

  onRegister(user) {
    this.setState({
      user
    });
  }


  render() {
    const { recipes, selectedRecipe } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


    // Before the recipes have been loaded
    if (recipes.length === 0) return <div className="main-view" />;
    
    return (
      <div className="main-view">
        {selectedRecipe
          ? <RecipeView recipe={selectedRecipe} onBackClick={newSelectedRecipe => { this.setSelectedRecipe(newSelectedRecipe); }}/>
          : recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} onRecipeClick={(recipe) => { this.setSelectedRecipe(recipe) }} />
          ))
        }
      </div>
    );
  }

}