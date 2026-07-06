import { CategoryContext } from "../../context/CategoryContext";
import { SearchContext } from "../../context/SearchContext";
import { useContext, useEffect, useMemo, useState } from "react";
import { MovieContext } from "../../context/MovieContext";
import { Pagination } from "../Pagination/Pagination";
import { ShowTrailer } from "../ShowTrailer/ShowTrailer";
import { MovieItem } from "../MovieItem/MovieItem";
import axios, { Axios } from "axios";
import "./MoviesCard.css";

export const MoviesCard = ({ category }) => {
  const { state, dispatch } = useContext(MovieContext);
  const { movies, loading, error, page, searchDelay, loadingTrailerId } = state;

  const { selectedGenre } = useContext(CategoryContext);
  const { search } = useContext(SearchContext);
  const [genres, setGenres] = useState([]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const getApiUrl = () => {
    const today = new Date().toISOString().split("T")[0];
    let url;

    if (searchDelay && searchDelay.trim() !== "") {
      return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchDelay}&page=${page}`;
    }

    switch (category) {
      case "trending":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_origin_country=IN&sort_by=popularity.desc&primary_release_date.lte=${today}&page=${page}`;
        break;

      case "top-rated":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_origin_country=IN&sort_by=vote_average.desc&vote_count.gte=50&primary_release_date.lte=${today}&include_adult=false&page=${page}`;
        break;

      case "upcoming":
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=primary_release_date.asc&primary_release_date.gte=${today}&include_adult=false&with_origin_country=IN&page=${page}`;
        break;

      default:
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_origin_country=IN&sort_by=primary_release_date.desc&primary_release_date.lte=${today}&page=${page}`;
        break;
    }

    if (selectedGenre) {
      url += `&with_genres=${selectedGenre}`;
    }

    return url;
  };

  const fetchMovies = async () => {
    dispatch({
      type: "SET_LOADING",
      load: true,
    });

    try {
      let url = getApiUrl();
      const res = await axios.get(url);
      console.log(res);

      dispatch({
        type: "SET_MOVIES",
        load: res.data.results || [],
      });
      dispatch({
        type: "SET_TOTALPAGE",
        load: res.data.total_pages || 1,
      });
      dispatch({
        type: "SET_LOADING",
        load: false,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "SET_LOADING",
        load: false,
      });
      dispatch({
        type: "SET_ERROR",
        load: err,
      });
    }
  };

  const fetchTrailer = async (movie) => {
    if (loadingTrailerId) return;

    dispatch({
      type: "SET_LOADINGTRAILERID",
      load: movie.id,
    });

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`,
      );
      const data = await res.json();

      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube",
      );

      if (trailer) {
        dispatch({
          type: "SET_TRAILERKEY",
          load: trailer.key,
        });
        dispatch({
          type: "SET_SHOWTRAILER",
          load: true,
        });
        dispatch({
          type: "SET_LOADINGTRAILERID",
          load: null,
        });
      } else {
        fetchYtTrailer(movie.title, movie.release_date);
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "SET_LOADINGTRAILERID",
        load: null,
      });
    }
  };

  const fetchYtTrailer = async (movieTitle, movieYear) => {
    try {
      const year = movieYear?.split("-")[0] || "";
      const query = `${movieTitle} "${year}" official trailer`;

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`,
      );
      const data = await res.json();

      if (data.items.length > 0) {
        dispatch({
          type: "SET_TRAILERKEY",
          load: data.items[0].id.videoId,
        });
        dispatch({
          type: "SET_SHOWTRAILER",
          load: true,
        });
        dispatch({
          type: "SET_LOADINGTRAILERID",
          load: null,
        });
      } else {
        dispatch({
          type: "SET_LOADINGTRAILERID",
          load: null,
        });
        alert("Trailer not available");
      }
    } catch {
      dispatch({
        type: "SET_LOADINGTRAILERID",
        load: null,
      });
      alert("Trailer not available");
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
      );
      const data = await res.json();
      setGenres(data.genres);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: "SET_SEARCHDELAY",
        load: search,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch({
      type: "SET_PAGE",
      load: 1,
    });
  }, [searchDelay]);

  useEffect(() => {
    fetchMovies();
  }, [page, searchDelay, category, selectedGenre]);

  const genreMap = useMemo(() => {
    return Object.fromEntries(genres.map((genre) => [genre.id, genre.name]));
  }, [genres]);

  useEffect(() => {
    fetchGenres();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 style={{ color: "#9ca3af" }}>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 style={{ color: "#9ca3af" }}>{error.message}</h1>
      </div>
    );
  }

  if (!loading && movies.length === 0) {
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
