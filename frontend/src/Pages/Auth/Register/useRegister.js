import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../../Context/AuthProvider";
import api from "../../../Config/axiosConfig";
import { toast } from "sonner";

export const useRegister = () => {
  const { setIsAuthenticated, setUserDetails } = useContext(authContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      const userData = response.data;

      setIsAuthenticated(true);
      setUserDetails(userData);
      navigate("/");
      toast.success("Account created successfully");
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
