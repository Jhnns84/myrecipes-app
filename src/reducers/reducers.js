import { combineReducers } from 'redux';

import { SET_FILTER, SET_RECIPES, SET_FAVORITES, SET_USER, UPDATE_USER } from '../actions/actions';

function visibilityFilter(state='', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function recipes(state= [], action) {
  switch (action.type) {
    case SET_RECIPES:
      return action.value;
    default: 
      return state;
  }
}

function favoriteRecipes(state= [], action) {
  switch (action.type) {
    case SET_FAVORITES:
      return action.value;
    default: 
      return state;
  }
}

function user(state= '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function userUpdate(state= '', action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.value;
    default:
      return state;
  }
}

const recipesApp = combineReducers({
  visibilityFilter,
  recipes, 
  favoriteRecipes,
  user, 
  userUpdate
});

export default recipesApp;