import { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme? JSON.parse(savedTheme) : true;
    });

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    },[theme]);
    
    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            { children }
        </ThemeContext.Provider>
    );
};
