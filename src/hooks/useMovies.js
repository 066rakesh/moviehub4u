import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { useMovie } from "../context/MovieContext";
import { CategoryContext } from "../context/CategoryContext";
import { SearchContext } from "../context/SearchContext";
import { GENRE_MAP } from "../constants/genres";
import { useDebounce } from "./useDebounce";
import {
  getMovies,
  getTrailerKey,
  searchYoutubeTrailer,
} from "../services/tmdb";

export const useMovies = (category) => {
  const { state, dispatch } = useMovie();
  const { movies, loading, error, page, loadingTrailerId } = state;

  const { selectedGenre } = useContext(CategoryContext);
  const { search } = useContext(SearchContext);
  const debouncedSearch = useDebounce(search, 500);

  // Movies fetch + page reset (ek hi effect mein)
  const filtersKey = `${category}|${selectedGenre}|${debouncedSearch}`;
  const prevFiltersKey = useRef(filtersKey);

  useEffect(() => {
    // Filter badla aur page 1 nahi hai: page 1 karo, effect dobara chalega
    if (prevFiltersKey.current !== filtersKey) {
      prevFiltersKey.current = filtersKey;

      if (page !== 1) {
        dispatch({ type: "SET_PAGE", load: 1 });
        return;
      }
    }

    const controller = new AbortController();

    const loadMovies = async () => {
      dispatch({ type: "SET_LOADING", load: true });

      try {
        const { movies, totalPages } = await getMovies({
          category,
          search: debouncedSearch,
          genre: selectedGenre,
          page,
          signal: controller.signal,
        });

        dispatch({ type: "SET_MOVIES", load: movies });
        dispatch({ type: "SET_TOTALPAGE", load: totalPages });
        dispatch({ type: "SET_LOADING", load: false });
      } catch (err) {
        if (axios.isCancel(err)) return;

        console.log(err);
        dispatch({ type: "SET_ERROR", load: err });
        dispatch({ type: "SET_LOADING", load: false });
      }
    };

    loadMovies();

    return () => controller.abort();
  }, [page, category, selectedGenre, debouncedSearch, dispatch]);

  // Trailer
  const fetchTrailer = async (movie) => {
    if (loadingTrailerId) return;

    dispatch({ type: "SET_LOADINGTRAILERID", load: movie.id });

    let key = null;

    try {
      key = await getTrailerKey(movie.id);
    } catch (err) {
      console.log(err);
    }

    if (!key) {
      try {
        key = await searchYoutubeTrailer(movie.title, movie.release_date);
      } catch (err) {
        console.log(err);
      }
    }

    if (key) {
      dispatch({ type: "SET_TRAILERKEY", load: key });
      dispatch({ type: "SET_SHOWTRAILER", load: true });
    } else {
      alert("Trailer not available");
    }

    dispatch({ type: "SET_LOADINGTRAILERID", load: null });
  };

  return { movies, loading, error, genreMap: GENRE_MAP, fetchTrailer };
};
