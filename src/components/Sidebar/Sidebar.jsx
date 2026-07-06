import { FiHome, FiTrendingUp, FiStar, FiCalendar } from "react-icons/fi";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoMdMoon } from "react-icons/io";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { CategoryContext } from "../../context/CategoryContext";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const menu = [
  { title: "Home", path: "/", label: "Home", icon: <FiHome /> },
  {
    title: "Trending",
    path: "/trending",
    label: "Trending",
    icon: <FiTrendingUp />
  },
  {
    title: "Top Rated",
    path: "/top-rated",
    label: "Top Rated",
    icon: <FiStar />,
  },
  {
    title: "Upcoming",
    path: "/upcoming",
    label: "Upcoming",
    icon: <FiCalendar />,
  },
];

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
];

export const Sidebar = ({ toggleBtn, setToggleBtn }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setSelectedGenre } = useContext(CategoryContext);

  return (
    <div className={`sidebar ${toggleBtn ? "show" : ""}`}>
      <p className="logo">
        <span className="logo-icon">
          <BiSolidCameraMovie />
        </span>
        <span className="logo-text1">Movie</span>
        <span className="logo-text2">Hub4u</span>
      </p>

      <div className="filter-box">
        {menu.map((item) => (
          <NavLink
            to={item.path}
            end={item.path === "/"}
            key={item.title}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => {
              if (window.innerWidth <= 1024) {
                setToggleBtn(false);
              }
            }}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>

      <div className="movie-filter">
        <p>Genres</p>

        {genres.map((genre) => (
          <a
            href="#"
            key={genre.id}
            onClick={(e) => {
              e.preventDefault();
              setSelectedGenre(genre.id);

              if (window.innerWidth <= 1024) {
                setToggleBtn(false);
              }
            }}
          >
            <span>{genre.name}</span>
          </a>
        ))}
      </div>

      <div
        className="mode-box"
        onClick={() => {
          setTheme((prev) => !prev);
          if (window.innerWidth <= 1024) {
            setToggleBtn(false);
          }
        }}
      >
        <span className="mode-icon">
          <IoMdMoon />
        </span>
        <span>{theme ? "Dark Mode" : "Light Mode"}</span>
      </div>

      <p className="owner">
        <span>@ 𝕽𝖆𝖐𝖊𝖘𝖍 𝕬𝖌𝖆𝖗𝖜𝖆𝖑</span>
      </p>
    </div>
  );
};
