import { useContext } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { FavoritesContext } from "../../context/FavoritesContext";

import "./Recipe.css";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function RecipePage() {
  const { recipeId } = useParams();
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
  );

  function getRecipe() {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Oops ... there was an error.</p>;
    }
    if (!data || !data.meals || data.meals.length == 0) {
      return <p>Could not get meal data.</p>;
    }

    const meal = data.meals[0];
    const isFavoriteMeal = isFavorite(meal.idMeal);
    var ingredientAmount = 0;
    for (let i = 1; i <= 20; i++) {
      var ingredient = meal[`strIngredient${i}`];
      if (ingredient !== "") {
        ingredientAmount++;
      } else {
        break;
      }
    }

    return (
      <>
        <button
          className={`favoriteButton ${isFavoriteMeal && "isFavorite"}`}
          onClick={() =>
            isFavoriteMeal
              ? removeFavorite(meal.idMeal)
              : addFavorite(meal.idMeal)
          }
        >
          {isFavoriteMeal ? "Remove Favorite" : "Add Favorite"}
        </button>
        <img id="RecipeHeroImage" src={meal.strMealThumb} alt={meal.strMeal} />

        {ingredientAmount > 0 && (
          <section id="IngredientsSection">
            <h3>Ingredients</h3>

            {Array.from({ length: ingredientAmount }, (_, index) => (
              <li key={index}>
                <span>{meal[`strIngredient${index + 1}`]}:</span>
                <span>{meal[`strMeasure${index + 1}`]}</span>
              </li>
            ))}
          </section>
        )}
        {meal.strInstructions && (
          <section id="RecipeInstructions">
            <h3>Instructions</h3>
            <p>{meal.strInstructions}</p>
          </section>
        )}
      </>
    );
  }

  return (
    <section id="Recipe">
      <PageHeader title={`Recipe Details`} />
      {getRecipe()}
    </section>
  );
}
