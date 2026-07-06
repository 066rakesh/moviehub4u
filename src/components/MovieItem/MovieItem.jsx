import { MovieContext } from "../../context/MovieContext";
import { CiPlay1 } from "react-icons/ci";
import { useContext } from "react";
import "./MovieItem.css";

export const MovieItem = ({ movie, genreMap, fetchTrailer }) => {
  const { state, dispatch } = useContext(MovieContext);
  const { readMore, loadingTrailerId } = state;

  return (
    <div className="movie-card">
      <div className="movie-image">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "./images/no_poster.png"
          }
        />
      </div>
      <div className="movie-info">
        <div className="top">
          <span className="rating">
            TMDB Rating: {movie.vote_average.toFixed(1)}
          </span>
          <span className="date">{movie.release_date}</span>
        </div>

        <h3>{movie.title}</h3>
        <p className="genre">
          Genre:{" "}
          {movie.genre_ids?.length
            ? movie.genre_ids
                .map((id) => genreMap[id])
                .filter(Boolean)
                .join(" | ")
            : "N/A"}
        </p>

        <p className={`description ${readMore === movie.id ? "show" : ""}`}>
          {movie.overview}
        </p>

        <div className="buttons">
          <button
            onClick={() => {
              dispatch({
                type: "SET_READMORE",
                load: readMore === movie.id ? null : movie.id,
              });
            }}
          >
            Read More
          </button>
          <button
            disabled={loadingTrailerId === movie.id}
            onClick={() => fetchTrailer(movie)}
          >
            {loadingTrailerId === movie.id ? (
              <>
                <span className="loader"></span>
                Loading...
              </>
            ) : (
              <>
                <span className="trailer-icon">
                  <CiPlay1 />
                </span>
                Trailer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};