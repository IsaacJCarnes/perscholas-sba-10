import { useEffect, useState, useContext } from "react";

import PageHeader from "../../components/PageHeader/PageHeader";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import { FavoritesContext } from "../../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites } = useContext(FavoritesContext);

  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    if (!favorites || favorites.length === 0) {
      setFavoritesData([]);
      return;
    }

    let cancelled = false;
    setFavoritesData(favorites.map(() => ({ loading: true, error: false })));

    Promise.all(
      favorites.map(async (favId) => {
        try {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favId}`,
          );
          if (!response.ok) throw new Error("Failed to fetch favorite");

          const result = await response.json();
          return { loading: false, error: false, meal: result.meals?.[0] };
        } catch {
          return { loading: false, error: true, meal: null };
        }
      }),
    ).then((results) => {
      if (!cancelled) setFavoritesData(results);
    });

    return () => {
      cancelled = true;
    };
  }, [favorites]);

  const getFavoritesList = () => {
    if (!favorites || favorites.length == 0) {
      return <p>No Favorites Yet</p>;
    }

    if (!favoritesData || favoritesData.length == 0) {
      return <p>Recipes are not currently available.</p>;
    }

    if (favoritesData.length === 0) {
      return (
        <div>
          <p>No Recipes Found</p>
          <p>We couldn't find any recipes in this category.</p>
        </div>
      );
    }

    return (
      <ul className="recipeGrid">
        {favoritesData.map((data) => {
          if (data.loading || data.error) {
            return <></>;
          }
          return <RecipeCard meal={data.meal} />;
        })}
      </ul>
    );
  };

  return (
    <section id="Favorites">
      <PageHeader title="Favorites"/>

      {getFavoritesList()}
    </section>
  );
}
