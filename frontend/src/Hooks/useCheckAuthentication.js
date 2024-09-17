import { useContext, useEffect } from "react";
import { authContext } from "../Context/AuthProvider";
import api from "../Config/axiosConfig";

const useCheckAuthentication = () => {
  const { setIsAuthenticated, setUserDetails, isAuthenticated } =
    useContext(authContext);

  const checkAuthentication = async () => {
    try {
      const response = await api.get("/auth/checkauthentication");

      const userData = response.data;

      setIsAuthenticated(true);
      setUserDetails(userData);
    } catch (error) {
      setIsAuthenticated(false);
      setUserDetails({});
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);
};

export default useCheckAuthentication;
