import axios from "axios";
import { createContext, useState, useEffect } from "react";

//we create this context to store user information and use it anywhere in our app

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //checkin in local storage, if there is a user - we are logged in
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:3000/api/auth/login",
      inputs, {withCredentials: true}
    );
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:3000/api/auth/logout");
    setCurrentUser(null);
    
  };

  //adding current user to our local storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  //passing it to our app
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
