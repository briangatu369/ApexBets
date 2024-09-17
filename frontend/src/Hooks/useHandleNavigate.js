import { useLocation, useNavigate } from "react-router-dom";

export const useHandleNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path, options) => {
    navigate(path, { state: { from: location }, ...options });
  };

  return { handleNavigate };
};
