import { Link } from "react-router-dom";

const RecipeCard = ({ meal }) => {
  return (
    <Link to={`/recipe/${meal.idMeal}`}>
      <li id={meal.idMeal} className="recipeCard">
        <h2>{meal.strMeal}</h2>
        <img src={meal.strMealThumb} />
      </li>
    </Link>
  );
};

export default RecipeCard;
