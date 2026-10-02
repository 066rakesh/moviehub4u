import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ThemeProvider } from "./context/ThemeContext";

export const App = () => {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};
