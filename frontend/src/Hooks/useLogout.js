import { useContext } from "react";
import { authContext } from "../Context/AuthProvider";
import api from "../Config/axiosConfig";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setIsAuthenticated, setUserDetails } = useContext(authContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.get("/auth/logout");
      toast.success("loggedout successfully");
      setIsAuthenticated(false);
      setUserDetails({});
      navigate("/");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return logout;
};

export default useLogout;
