import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
export class RecipeView extends React.Component {

  render() {
    const { recipe, onBackClick } = this.props;

    return (
      <Card bg = 'light'>
        <Card.Img variant="top" src={recipe.ImagePath} />
        <Card.Body>
          <Card.Title>{recipe.Name}</Card.Title>
          <Card.Text>{recipe.Description}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Mealtype:</Card.Subtitle>
          <Card.Text>{recipe.MealType.Name}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Cuisine:</Card.Subtitle>
          <Card.Text>{recipe.Cuisine.Name}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Difficulty:</Card.Subtitle>
          <Card.Text>{recipe.Difficulty}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Time to make:</Card.Subtitle>
          <Card.Text>{recipe.Time}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Key Ingredients:</Card.Subtitle>
          <Card.Text>{recipe.KeyIngredients}</Card.Text>
          <Button variant="outline-dark" onClick={() => {onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
      
      // <Row className="recipe-view justify-content-md-center">
      //   {/* <Col md={8}>
      //     {recipe.Name}
      //   </Col> */}
      //   <Col md={8}>
      //   <Image src={recipe.ImagePath} fluid />
      //     </Col>
      // </Row>

      // <div className="recipe-view">
      //   <div className="recipe-image">
      //     <img width={500} src={recipe.ImagePath} />
      //   </div>
      //   <div className="recipe-name">
      //     <span className="label">Name: </span>
      //     <span className="value">{recipe.Name}</span>
      //   </div>
      //   <div className="recipe-description">
      //     <span className="label">Description: </span>
      //     <span className="value">{recipe.Description}</span>
      //   </div>
      //   <button onClick={() => {onBackClick(null); }}>Back</button>

      //  </div>
    );
  }
}