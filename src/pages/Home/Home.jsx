import { Link } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import PageHeader from "../../components/PageHeader/PageHeader";

export default function HomePage() {
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
  );

  const getHome = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Oops ... there was an error.</p>;
    }
    if (!data || !data.categories) {
      return <p>Categories are not currently available.</p>;
    }

    return (
      <div className="recipeGrid">
        {data.categories.map((category) => (
          <Link
            key={category.idCategory}
            to={`/category/${category.strCategory}`}
          >
            <div className="recipeCard">
              <h2>{category.strCategory}</h2>
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <section id="Home">
      <PageHeader title="Browse By Category" />
      {getHome()}
    </section>
  );
}
