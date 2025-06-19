import axios from "axios";
import { createContext, useContext, useEffect, useState, useMemo } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [user, setUser] = useState(()=>{
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const getUser = async () => {
    const res = await axios.get("http://localhost:7460/api/profile/me",{
        headers:{
          Authorization: `Bearer ${token}`
        }
    })
    const newUser = res.data

    if (newUser) {  
      localStorage.setItem("user", JSON.stringify(newUser))
      setUser(newUser)
    }
  }

  const login = (newToken) => {
    setToken(newToken)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    setToken(null)
    localStorage.removeItem("token")
  }

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      getUser()
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      setUser,
      login,
      logout
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext)
};

export default AuthProvider;
