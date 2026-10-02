# MovieHub4u

A responsive movie discovery web app built with React and the TMDB API. Browse Trending, Top Rated and Upcoming movies, filter by genre, search, and watch trailers. An Express proxy server keeps the API key out of the browser.

**Live demo:** https://moviehub-4u.netlify.app

> The backend runs on a free Render instance, so the first request after a period of inactivity can take up to 30 seconds.

## Features

- Trending, Top Rated and Upcoming pages, plus a Home page with the latest releases
- Genre filters with an active state and an "All" option
- Debounced search (waits 500 ms after typing stops)
- Pagination (TMDB's 500-page limit is handled)
- Trailer player in a modal (Esc or outside click to close), with a YouTube search fallback
- Dark and light theme
- Responsive layout with a mobile sidebar
- Custom 404 page

## Tech stack

- **Frontend:** React, Vite, React Router, Context API, `useReducer`, Axios, CSS
- **Backend:** Node.js, Express, Axios, CORS, dotenv
- **APIs:** TMDB, YouTube Data API
- **Deployment:** Netlify (frontend), Render (backend)

## How it works

```
Browser (React)  ->  Express proxy (Render)  ->  TMDB API
```

The React app never calls TMDB directly. It calls the Express server, which adds the API key and forwards the request. This keeps the key private and also avoids ISP-level blocking of the TMDB API that I ran into on my own network.

Key design decisions:

- **Global state with Context and `useReducer`:** movies, loading, error, pagination and trailer state live in one reducer, so related state changes happen together.
- **Layered code:** UI components do not fetch data. API calls live in `services/tmdb.js`, and the fetching logic lives in custom hooks (`useMovies`, `useDebounce`).
- **Stale request handling:** `AbortController` cancels old requests so a slow response cannot overwrite newer results.
- **Reusable page component:** one `MoviesSection` component serves all pages through a `category` prop.

## Project structure

```
src/
  components/    Sidebar, Header, MoviesCard, MovieItem, Pagination, ShowTrailer
  constants/     genres list
  context/       Theme, Search, Category and Movie (reducer) providers
  hooks/         useMovies, useDebounce
  pages/         Home, Trending, TopRated, Upcoming, NotFound
  routes/        router configuration
  services/      tmdb.js (all API calls)
server/
  server.js      Express proxy
public/
  _redirects     SPA routing rule for Netlify
```

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/066rakesh/moviehub4u.git
cd moviehub4u
npm install
cd server
npm install
```

### 2. Environment variables

Get a free API key from [TMDB](https://www.themoviedb.org/settings/api).

Frontend, create `.env` in the project root:

```
VITE_API_URL=http://localhost:5000
VITE_YOUTUBE_API_KEY=your_youtube_api_key
```

Backend, create `server/.env`:

```
PORT=5000
CLIENT_URL=http://localhost:5173
TMDB_API_KEY=your_tmdb_api_key
```

### 3. Run

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend in a second terminal, from the project root:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

## Deployment

- **Backend (Render):** root directory `server`, build command `npm install`, start command `node server.js`. Set `TMDB_API_KEY` and `CLIENT_URL` (the Netlify URL, without a trailing slash).
- **Frontend (Netlify):** build command `npm run build`, publish directory `dist`. Set `VITE_API_URL` (the Render URL) and `VITE_YOUTUBE_API_KEY`. The `public/_redirects` file makes page refreshes work with React Router.

## Known limitations and future work

- The YouTube key is still used in the browser for the trailer fallback. Next step is moving it behind the proxy.
- The proxy forwards any TMDB path. I plan to allow only the paths the app uses and add rate limiting.
- Search uses TMDB's search endpoint, which does not support genre or category filters.
- Planned: movie details page, watchlist, and user login with MongoDB and JWT.

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Author

Rakesh Kumar, [GitHub](https://github.com/066rakesh) | [LinkedIn](https://linkedin.com/in/066rakesh)