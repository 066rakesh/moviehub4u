import { useReducer, createContext } from "react";

export const MovieContext = createContext();

const initialState = {
  movies: [],
  loading: true,
  error: null,
  page: 1,
  totalPage: 1,
  readMore: null,
  searchDelay: "",
  trailerKey: "",
  showTrailer: false,
  loadingTrailerId: null,
};

const reducer = (state, action) => {
  switch(action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.load,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.load,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.load,
      }

    case "SET_PAGE":
      return ({
        ...state,
        page: action.load
      })

    case "SET_TOTALPAGE":
      return ({
        ...state,
        totalPage: action.load,
      })

    case "SET_READMORE":
      return ({
        ...state,
        readMore: action.load,
      })

    case "SET_SEARCHDELAY":
      return ({
        ...state,
        searchDelay: action.load,
      })

    case "SET_TRAILERKEY": 
      return ({
        ...state,
        trailerKey: action.load,
      }) 
      
    case "SET_SHOWTRAILER":
      return ({
        ...state,
        showTrailer: action.load,
      })

    case "SET_LOADINGTRAILERID":
      return ({
        ...state,
        loadingTrailerId: action.load,
      })
    
    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState);
  return (
    <MovieContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
