import { MovieProvider } from "../../context/MovieContext";
import "./MoviesSection.css";
import { MoviesCard } from "../MoviesCard/MoviesCard";

export const MoviesSection = ({ category }) => {
  return (
    <div className="main-content">
      <MovieProvider>
        <MoviesCard category={category} />
      </MovieProvider>
    </div>
  );
};
