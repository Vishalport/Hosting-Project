import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { API } from "../config/config";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    refreshToken: "",
  });

  useEffect(() => {
    //* agar local storage me kuch ho wo phele hi set ho jaye->  prevent logout when refresh
    let formLocalStorage = localStorage.getItem("auth");
    if (formLocalStorage) {
      setAuth(JSON.parse(formLocalStorage)); //we use parse when we fatch data use stringfy when we set data
    }
  }, []);

  // url went with
  axios.defaults.baseURL = API;
  axios.defaults.headers.common["token"] = auth?.token ;


  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext); //* use to access the state.
export { AuthProvider, useAuth };
