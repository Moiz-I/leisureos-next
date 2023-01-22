// import {
//   createContext,
//   useContext,
//   useMemo,
//   useReducer,
//   useState,
//   useEffect,
// } from "react";
// import { AppReducer, initialState } from "./AppCReducer";

// const AppContext = createContext();
// export function AppWrapper({ children }) {
//   const { state, dispatch } = useReducer(AppReducer, initialState);
//   const contextValue = useMemo(() => {
//     return { state, dispatch };
//   }, [state, dispatch]);

//   useEffect(() => {
//     if (JSON.parse(localStorage.getItem("state"))) {
//       //checking if there already is a state in localstorage
//       //if yes, update the current state with the stored one
//       dispatch({
//         type: "init_stored",
//         value: JSON.parse(localStorage.getItem("state")),
//       });
//     }
//   }, []);
//   useEffect(() => {
//     if (state !== initialState) {
//       localStorage.setItem("state", JSON.stringify(state));

//       //create and/or set a new localstorage variable called "state"
//     }
//   }, [state]);

//   return (
//     <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
//   );
// }
// export function useAppContext() {
//   return useContext(AppContext);
// }
