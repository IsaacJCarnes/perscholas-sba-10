import { useParams } from "react-router-dom";

import RecipeCard from "../../components/RecipeCard/RecipeCard";
import useFetch from "../../hooks/useFetch";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function CategoryPage() {
  const { categoryName } = useParams();

  const url = categoryName
    ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
    : null;

  const { data, loading, error } = useFetch(url);

  const getRecipesList = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Oops ... there was an error.</p>;
    }
    if (!data || !data.meals || data.meals.length == 0) {
      return <p>Recipes are not currently available.</p>;
    }
    return (
      <ul className="recipeGrid">
        {data.meals.map((meal) => (
          <RecipeCard meal={meal} />
        ))}
      </ul>
    );
  };

  return (
    <section id="Category">
      <PageHeader title={`${categoryName} Recipes`} />
      {getRecipesList()}
    </section>
  );
}
