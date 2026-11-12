import { createContext } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export const FavoritesContext = createContext(undefined);

export function FavoritesProvider({ children }) {
  const { storageData, setStorageItem } = useLocalStorage("favoriteRecipes");
  const favorites = storageData.favorites || [];
  const addFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites
      : [...favorites, id];
    setStorageItem("favorites", newFavorites);
  };

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter((favoriteId) => favoriteId !== id);
    setStorageItem("favorites", newFavorites);
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
