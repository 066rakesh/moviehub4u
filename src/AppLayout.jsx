import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { SearchProvider } from "./context/SearchContext";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import { CategoryProvider } from "./context/CategoryContext";
import  "./AppLayout.css";

export const AppLayout = () => {
  const [toggleBtn, setToggleBtn] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`dashboard ${theme ? "dark" : "light"} `}>
        <CategoryProvider>
          <aside>
            <Sidebar toggleBtn={toggleBtn} setToggleBtn={setToggleBtn} />
          </aside>

          <SearchProvider>
            <div className="main-layout">
              <Header toggleBtn={toggleBtn} setToggleBtn={setToggleBtn} />

              <main>
                <Outlet />
              </main>
            </div>
          </SearchProvider>
        </CategoryProvider>
      </div>
    </>
  );
};
