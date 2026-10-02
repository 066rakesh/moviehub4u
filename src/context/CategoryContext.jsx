/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  return (
    <CategoryContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </CategoryContext.Provider>
  );
};
