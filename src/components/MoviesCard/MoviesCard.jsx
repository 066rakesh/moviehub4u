import { useMovies } from "../../hooks/useMovies";
import { Pagination } from "../Pagination/Pagination";
import { ShowTrailer } from "../ShowTrailer/ShowTrailer";
import { MovieItem } from "../MovieItem/MovieItem";
import "./MoviesCard.css";
import { Spinner } from "../Spinner/Spinner";

export const MoviesCard = ({ category }) => {
  const { movies, loading, error, genreMap, fetchTrailer } =
    useMovies(category);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div>
        <h1 style={{ color: "#9ca3af" }}>{error?.message}</h1>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h1 style={{ color: "#9ca3af" }}>No results found</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieItem
            key={movie.id}
            movie={movie}
            genreMap={genreMap}
            fetchTrailer={fetchTrailer}
          />
        ))}
      </div>

      <ShowTrailer />
      <Pagination />
    </div>
  );
};
