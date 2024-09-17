import { useContext, useEffect, useState } from "react";
import { authContext } from "../Context/AuthProvider";
import { useHandleNavigate } from "../Hooks/useHandleNavigate";
import api from "../Config/axiosConfig";
import { toast } from "sonner";

export const useGetBetHistory = (url, isOpen) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [betHistory, setBetHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useContext(authContext);
  const { handleNavigate } = useHandleNavigate();

  const getBetHistory = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(url, {
        params: {
          page: currentPage,
        },
      });
      const data = response.data;
      const { betList } = data;

      //end of list
      if (betList.length === 0) {
        setIsLoading(false);
        return;
      }

      setCurrentPage((prevPage) => {
        return prevPage + 1;
      });
      setBetHistory([...betHistory, ...betList]);
      setIsLoading(false);
    } catch (error) {
      if (!error.response) {
        toast.error("failed to contact the server");
      } else if (error.response.status === 401) {
        setIsAuthenticated(false);
        handleNavigate("/login");
      } else if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Unknown error occured,please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //reset bethistory
    if (!isOpen) {
      setBetHistory([]);
      setCurrentPage(1);
    }

    //first time fetch
    if (isOpen && currentPage === 1) {
      getBetHistory();
    }
  }, [isOpen, currentPage]);

  return { getBetHistory, betHistory, isLoading, currentPage };
};
