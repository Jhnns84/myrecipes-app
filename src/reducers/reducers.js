import { combineReducers } from 'redux';

import { SET_FILTER, SET_RECIPES } from '../actions/actions';

function visibilityFilter(state='', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default: return state;
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

const recipesApp = combineReducers({
  visibilityFilter,
  recipes
});

export default recipesApp;