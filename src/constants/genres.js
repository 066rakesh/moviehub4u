export const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

// id se naam nikalne ke liye (movie card ke genre text mein)
export const GENRE_MAP = Object.fromEntries(
  GENRES.map((genre) => [genre.id, genre.name]),
);

// Sidebar mein sirf ye genres dikhte hain
const SIDEBAR_GENRE_IDS = [28, 12, 16, 35, 80, 18, 27, 10749, 878, 53];

export const SIDEBAR_GENRES = GENRES.filter((genre) =>
  SIDEBAR_GENRE_IDS.includes(genre.id),
);
