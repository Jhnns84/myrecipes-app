export const SET_RECIPES = 'SET_RECIPES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';

export function setRecipes(value) {
  return { 
    type: SET_RECIPES,
    value
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}

export function setUser(value) {
  return {
    type: SET_USER,
    value
  };
}