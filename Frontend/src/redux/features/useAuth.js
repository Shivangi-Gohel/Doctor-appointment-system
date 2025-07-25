import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../constant";
const useAuth = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios.get(`${url}/users/me`, {
          withCredentials: true, 
        });
        
        if (res.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true); 
      }
    };

    verifyAuth();
  }, []);

  return { isAuthenticated, authChecked };
};

export default useAuth;