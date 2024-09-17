import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { authContext } from "../../../Context/AuthProvider";
import api from "../../../Config/axiosConfig";
import { toast } from "sonner";
import { useHandleNavigate } from "../../../Hooks/useHandleNavigate";

export const useLogin = () => {
  const { setIsAuthenticated, setUserDetails } = useContext(authContext);
  const { handleNavigate } = useHandleNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      const userData = response.data;

      setIsAuthenticated(true);
      setUserDetails(userData);
      handleNavigate(from);
      toast.success("Logged In successfully");
    } catch (error) {
      if (!error.response) {
        toast.error("failed to contact server");
      } else if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unknown error occured, please try again");
      }
    }
  };

  return onSubmit;
};
