import { Link, useSearchParams } from "react-router-dom";

import RecipeCard from "../../components/RecipeCard/RecipeCard";
import useFetch from "../../hooks/useFetch";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const url = query
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    : null;

  const { data, loading, error } = useFetch(url);

  function getSearch() {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Oops ... there was an error.</p>;
    }
    if (!data || !data.meals || data.meals.length == 0) {
      return (
        <div>
          <h2>No Matching Recipes</h2>

          <p>
            We couldn't find any recipes matching "{query}". Try another search
            term.
          </p>

          <Link to="/">Browse Categories</Link>
        </div>
      );
    }
    return (
      <ul className="recipeGrid">
        {data.meals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </ul>
    );
  }

  return (
    <section id="Search">
      <PageHeader title={`Results for '${query}'`} />
      {getSearch()}
    </section>
  );
}
