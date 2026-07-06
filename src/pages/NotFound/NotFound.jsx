import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export const NotFound = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    return (
        <>
            <div className={`err-box ${theme? "dark" : "light"}`}>
                <div className="err-image">
                    <img src="/images/404.png" alt="404" />
                </div>
                <div className="err-info">
                    <h2>Oops! Page Not Found</h2>

                    <p>
                        The page you are looking for could not be found.
                    </p>

                    <div className="err-btns">
                        <button onClick={() => navigate("/")}>
                            Go To Home
                        </button>

                        <button onClick={() => navigate(-1)}>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
