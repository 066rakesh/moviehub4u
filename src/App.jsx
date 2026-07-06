import { ThemeProvider } from "../src/context/ThemeContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

export const App = () => {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </>
  );
};