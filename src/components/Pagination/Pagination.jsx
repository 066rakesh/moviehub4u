import "./Pagination.css";
import {useContext} from "react";
import {MovieContext}  from "../../context/MovieContext"

export const Pagination = () => {
  const { state, dispatch } = useContext(MovieContext);
  const { page, totalPage } = state;
  return (
    <div className="pagination">
      <button
        onClick={() => dispatch({
          type: "SET_PAGE",
          load: Math.max(page - 1, 1),
        })}
        disabled={page === 1}
      >
        Prev
      </button>

      <span className="page-state">
        Page {page} of {totalPage}
      </span>

      <button
        onClick={() => dispatch({
          type: "SET_PAGE",
          load: page + 1,
        })}
        disabled={page >= totalPage}
      >
        Next
      </button>
    </div>
  );
};
