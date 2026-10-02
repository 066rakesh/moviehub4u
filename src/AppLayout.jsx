import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { CategoryProvider } from "./context/CategoryContext";
import { SearchProvider } from "./context/SearchContext";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import "./AppLayout.css";

export const AppLayout = () => {
  const [toggleBtn, setToggleBtn] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`dashboard ${theme ? "dark" : "light"}`}>
      <CategoryProvider>
        <aside>
          <Sidebar toggleBtn={toggleBtn} setToggleBtn={setToggleBtn} />
        </aside>

        <div
          className={`overlay ${toggleBtn ? "show" : ""}`}
          onClick={() => setToggleBtn(false)}
        />

        <SearchProvider>
          <div className="main-layout">
            <Header setToggleBtn={setToggleBtn} />

            <main>
              <Outlet />
            </main>
          </div>
        </SearchProvider>
      </CategoryProvider>
    </div>
  );
};
