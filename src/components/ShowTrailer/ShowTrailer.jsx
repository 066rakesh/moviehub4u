import "./ShowTrailer.css";
import {useContext} from "react";
import {MovieContext} from "../../context/MovieContext";

export const ShowTrailer = () => {
  const { state, dispatch} = useContext(MovieContext);
  const { showTrailer, trailerKey } = state;
  return (
    <div className="show-trailer">
      {showTrailer && (
        <div className="trailer-modal">
          <div className="trailer-content">
            <span className="close" onClick={() => dispatch({
              type: "SET_SHOWTRAILER",
              load: false,
            })}>
              ✖
            </span>

            <iframe
              className="trailer"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Movie Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
