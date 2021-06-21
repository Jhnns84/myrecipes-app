export const SET_FILTER = 'SET_FILTER';
export const SET_RECIPES = 'SET_RECIPES';
export const SET_FAVORITES = 'SET_FAVORITES';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';


export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}

export function setRecipes(value) {
  return { 
    type: SET_RECIPES,
    value
  };
}

export function setFavorites(value) {
  return { 
    type: SET_FAVORITES,
    value
  };
}

export function setUser(value) {
  return {
    type: SET_USER,
    value
  };
}

export function updateUser(value) {
  return {
    type: UPDATE_USER,
    value
  };
}