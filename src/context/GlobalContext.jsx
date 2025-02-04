import { createContext, useEffect, useReducer } from "react";
import { LikedImages } from "../pages";

export const GlobalContext = createContext();

// const dataFromLocaleStorage = () => {
//   return (
//     JSON.parse(localStorage.getItem("my-splash-data")) || {
//       likedImages: [],
//       downloadImages: [],
//     }
//   );
// };

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "AUTH_READY":
      return {
        ...state,
        authReady: true,
      };
    case "LOGOUt":
      return {
        ...state,
        user: null,
      };
    case "DOWNLOAD":
      return {
        ...state,
        downloadImages: [...state.downloadImages, payload],
      };
    case "LIKE":
      return {
        ...state,
        likedImages: [...state.likedImages, payload],
      };
    case "UNLIKE":
      return {
        ...state,
        likedImages: state.likedImages.filter((img) => img.id != payload),
      };
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, {
    user: null,
    authReady: false,
    likedImages: [],
    downloadImages: [],
  });

  useEffect(() => {
    localStorage.setItem("my-splash-data", JSON.stringify(state));
  }, [state]);
  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
