import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../AppLayout";
import { Home } from "../pages/Home/Home";
import { Trending } from "../pages/Trending/Trending";
import { TopRated } from "../pages/TopRated/TopRated";
import { Upcoming } from "../pages/Upcoming/Upcoming";
import { NotFound } from "../pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "trending",
        element: <Trending />,
      },
      {
        path: "top-rated",
        element: <TopRated />,
      },
      {
        path: "upcoming",
        element: <Upcoming />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
