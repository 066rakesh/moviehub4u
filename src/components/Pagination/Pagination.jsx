import { useMovie } from "../../context/MovieContext";
import "./Pagination.css";

export const Pagination = () => {
  const { state, dispatch } = useMovie();
  const { page, totalPage } = state;

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => dispatch({ type: "SET_PAGE", load: page - 1 })}
      >
        Prev
      </button>

      <span className="page-state">
        Page {page} of {totalPage}
      </span>

      <button
        type="button"
        disabled={page >= totalPage}
        onClick={() => dispatch({ type: "SET_PAGE", load: page + 1 })}
      >
        Next
      </button>
    </div>
  );
};
