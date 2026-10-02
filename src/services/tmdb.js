import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const YOUTUBE_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const MAX_TMDB_PAGES = 500;

const tmdb = axios.create({
  baseURL: `${API_URL}/api/tmdb`,
});

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: YOUTUBE_KEY },
});

const getCategoryParams = (category) => {
  const today = new Date().toISOString().split("T")[0];

  switch (category) {
    case "trending":
      return {
        sort_by: "popularity.desc",
        "primary_release_date.lte": today,
      };
    case "top-rated":
      return {
        sort_by: "vote_average.desc",
        "vote_count.gte": 50,
        "primary_release_date.lte": today,
        include_adult: false,
      };
    case "upcoming":
      return {
        sort_by: "primary_release_date.asc",
        "primary_release_date.gte": today,
        include_adult: false,
      };
    default:
      return {
        sort_by: "primary_release_date.desc",
        "primary_release_date.lte": today,
      };
  }
};

export const getMovies = async ({ category, search, genre, page, signal }) => {
  const query = search.trim();

  const res = query
    ? await tmdb.get("/search/movie", { params: { query, page }, signal })
    : await tmdb.get("/discover/movie", {
        params: {
          with_origin_country: "IN",
          ...getCategoryParams(category),
          with_genres: genre || undefined,
          page,
        },
        signal,
      });

  return {
    movies: res.data.results ?? [],
    totalPages: Math.min(res.data.total_pages || 1, MAX_TMDB_PAGES),
  };
};

export const getTrailerKey = async (movieId) => {
  const res = await tmdb.get(`/movie/${movieId}/videos`);
  const trailer = res.data.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  return trailer?.key ?? null;
};

export const searchYoutubeTrailer = async (title, releaseDate) => {
  const year = releaseDate?.split("-")[0] || "";

  const res = await youtube.get("/search", {
    params: {
      part: "snippet",
      q: `${title} "${year}" official trailer`,
      type: "video",
      maxResults: 5,
    },
  });

  return res.data.items?.[0]?.id?.videoId ?? null;
};
