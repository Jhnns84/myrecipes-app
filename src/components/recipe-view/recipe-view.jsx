import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './recipe-view.scss';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import axios from 'axios';

export class RecipeView extends React.Component {

  addFavorite() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.put(`https://jm-myrecipes-api.herokuapp.com/users/${user}` + "/recipes/" + this.props.recipe._id, {}, {
      headers: { Authorization: `Bearer ${token}`} }
    )
    .then((response) => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(response.data.FavoriteRecipes));
      console.log(response);
      alert(this.props.recipe.Name + " has been added to your favorite recipes.")
    })
  }

  render() {
    const { recipe, onBackClick } = this.props;

    return (
      <Card bg = 'light' style={{ margin: '1em' }}>
        <div className="image-view">
          <Card.Img variant="top" src={recipe.ImagePath} />
        </div>
        <Card.Body>
          <Card.Title>{recipe.Name}</Card.Title>
          <Card.Text className="mb-4">{recipe.Description}</Card.Text>
          <Row>
            <Col>
              <Card.Subtitle className="mb-2 text-muted">Mealtype:</Card.Subtitle>
              <Link to={`/mealtypes/${recipe.MealType.Name}`}>
                <Button className="mb-3" variant="link">{recipe.MealType.Name}</Button>
              </Link>
            </Col>
            <Col>
              <Card.Subtitle className="mb-2 text-muted">Cuisine:</Card.Subtitle>
              <Link to={`/cuisines/${recipe.Cuisine.Name}`}>
                <Button className="mb-3" variant="link">{recipe.Cuisine.Name}</Button>
              </Link>
            </Col>
            <Col>
              <Card.Subtitle className="mb-2 text-muted">Difficulty:</Card.Subtitle>
              <Card.Text>{recipe.Difficulty}</Card.Text>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
            <Card.Subtitle className="mb-2 text-muted">Time to make:</Card.Subtitle>
            <Card.Text>{recipe.Time}</Card.Text>
            </Col>
            <Col md={8}>
              <Card.Subtitle className="mb-2 text-muted">Key Ingredients:</Card.Subtitle>
              <Card.Text>{recipe.KeyIngredients.join(", ")}</Card.Text>
            </Col>
          </Row>
          <Link to={`/recipes/${recipe._id}`}>
            <Button className="button-favorite" variant="outline-success"onClick={() => this.addFavorite(recipe)}>Add to favorites</Button>
          </Link>
          <Button className="m-4" variant="outline-dark" onClick={() => {onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
      
    );
  }
}

RecipeView.propTypes = {
  recipe: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Cuisine: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    MealType: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Difficulty: PropTypes.string.isRequired,
    Time: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Featured: PropTypes.bool
  })
};