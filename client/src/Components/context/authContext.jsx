import { createContext, useState, useEffect } from "react";
import axiosInstance from "../../helpers/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("Unexpected error:", err.response?.data || err.message);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);


  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

