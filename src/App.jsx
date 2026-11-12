import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/Home/Home";
import CategoryPage from "./pages/Category/Category";
import RecipePage from "./pages/Recipe/Recipe";
import FavoritesPage from "./pages/Favorites/Favorites";
import SearchPage from "./pages/Search/Search";
import NotFoundPage from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/category/:categoryName" element={<CategoryPage />} />

        <Route path="/recipe/:recipeId" element={<RecipePage />} />

        <Route path="/favorites" element={<FavoritesPage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
