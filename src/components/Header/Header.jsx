import { IoIosSearch } from "react-icons/io";
import { IoReorderThreeSharp } from "react-icons/io5";
import { SearchContext } from "../../context/SearchContext";
import { useContext } from "react";
import "./Header.css";

export const Header = ({ setToggleBtn }) => {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <div className="header">
      <button
        className="sidebar-icon"
        onClick={() => setToggleBtn((prev) => !prev)}
      >
        <IoReorderThreeSharp />
      </button>

      <div className="input-box">
        <span className="search-icon">
          <IoIosSearch />
        </span>
        <input
          type="text"
          name="text"
          placeholder="Search Movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};
