import { createContext, useContext, useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user and profile data using token
  const fetchUserData = async (token) => {
    try {
      const res = await fetch(`http://localhost:8080/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const userData = await res.json();
      console.log("User Data:", userData);
      setUser(userData);

      const userId = userData._id;
      if (!userId) throw new Error("User ID not found");

      // Fetch user profile
      const profileRes = await fetch(`http://localhost:8080/api/user-profiles/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!profileRes.ok) throw new Error("Failed to fetch profile");

      const profileData = await profileRes.json();
      console.log("Profile Data:", profileData);
      setProfile(profileData);
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token"); // Remove invalid token
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    // Clear all local storage
    localStorage.clear();
  
    // Clear all session storage
    sessionStorage.clear();
  
    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  
    // Reset state
    setUser(null);
    setProfile(null);
  
    // Navigate to auth page
    navigate("/auth");
  };
  

  // useEffect(() => {
  //   console.log("🚀 useEffect triggered on app open");
    
  //   const token = localStorage.getItem("token");
  //   console.log("📌 Token from localStorage:", token);
  
  //   if (token) {
  //     fetchUserData(token);
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    console.log("user:", user);
    console.log("profile:", profile);
  }, [user, profile]);
  

  return (
    <UserContext.Provider value={{ user, profile, setUser, setProfile, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

