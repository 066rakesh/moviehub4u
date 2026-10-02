import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiTrendingUp, FiStar, FiCalendar } from "react-icons/fi";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoMdMoon } from "react-icons/io";
import { ThemeContext } from "../../context/ThemeContext";
import { CategoryContext } from "../../context/CategoryContext";
import { SIDEBAR_GENRES } from "../../constants/genres";
import "./Sidebar.css";

const MOBILE_BREAKPOINT = 1024;

const menu = [
  { title: "Home", path: "/", icon: <FiHome /> },
  { title: "Trending", path: "/trending", icon: <FiTrendingUp /> },
  { title: "Top Rated", path: "/top-rated", icon: <FiStar /> },
  { title: "Upcoming", path: "/upcoming", icon: <FiCalendar /> },
];

export const Sidebar = ({ toggleBtn, setToggleBtn }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { selectedGenre, setSelectedGenre } = useContext(CategoryContext);

  const closeOnMobile = () => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      setToggleBtn(false);
    }
  };

  const handleGenreClick = (e, genreId) => {
    e.preventDefault();
    setSelectedGenre(genreId);
    closeOnMobile();
  };

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
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={closeOnMobile}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>

      <div className="movie-filter">
        <p>Genres</p>

        <a
          href="#"
          className={!selectedGenre ? "active" : ""}
          onClick={(e) => handleGenreClick(e, null)}
        >
          <span>All</span>
        </a>

        {SIDEBAR_GENRES.map((genre) => (
          <a
            href="#"
            key={genre.id}
            className={selectedGenre === genre.id ? "active" : ""}
            onClick={(e) => handleGenreClick(e, genre.id)}
          >
            <span>{genre.name}</span>
          </a>
        ))}
      </div>

      <div
        className="mode-box"
        onClick={() => {
          setTheme((prev) => !prev);
          closeOnMobile();
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
