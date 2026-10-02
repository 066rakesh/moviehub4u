import { useEffect } from "react";
import { useMovie } from "../../context/MovieContext";
import "./ShowTrailer.css";

export const ShowTrailer = () => {
  const { state, dispatch } = useMovie();
  const { showTrailer, trailerKey } = state;

  const closeTrailer = () => {
    dispatch({ type: "SET_SHOWTRAILER", load: false });
  };

  useEffect(() => {
    if (!showTrailer) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        dispatch({ type: "SET_SHOWTRAILER", load: false });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showTrailer, dispatch]);

  if (!showTrailer) return null;

  return (
    <div
      className="trailer-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeTrailer();
      }}
    >
      <div className="trailer-content">
        <button
          type="button"
          className="close"
          aria-label="Close trailer"
          onClick={closeTrailer}
        >
          ✖
        </button>

        <iframe
          className="trailer"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
