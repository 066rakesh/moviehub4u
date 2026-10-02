import { CiPlay1 } from "react-icons/ci";
import { useMovie } from "../../context/MovieContext";
import "./MovieItem.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const NO_POSTER = "/images/no_poster.png";

export const MovieItem = ({ movie, genreMap, fetchTrailer }) => {
  const { state, dispatch } = useMovie();
  const { readMore, loadingTrailerId } = state;

  const isExpanded = readMore === movie.id;
  const isTrailerLoading = loadingTrailerId === movie.id;

  const genreText = movie.genre_ids?.length
    ? movie.genre_ids
        .map((id) => genreMap[id])
        .filter(Boolean)
        .join(" | ")
    : "N/A";

  return (
    <div className="movie-card">
      <div className="movie-image">
        <img
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${movie.poster_path}`
              : NO_POSTER
          }
          alt={movie.title}
          loading="lazy"
        />
      </div>

      <div className="movie-info">
        <div className="top">
          <span className="rating">
            TMDB Rating: {(movie.vote_average ?? 0).toFixed(1)}
          </span>
          <span className="date">{movie.release_date || "TBA"}</span>
        </div>

        <h3>{movie.title}</h3>
        <p className="genre">Genre: {genreText}</p>

        <p className={`description ${isExpanded ? "show" : ""}`}>
          {movie.overview}
        </p>

        <div className="buttons">
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: "SET_READMORE",
                load: isExpanded ? null : movie.id,
              })
            }
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>

          <button
            type="button"
            disabled={isTrailerLoading}
            onClick={() => fetchTrailer(movie)}
          >
            {isTrailerLoading ? (
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
