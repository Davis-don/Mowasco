import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export const useSearchCustomer = async (url, value) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [searchedCustomer, setSearchedCustomer] = useState();

  console.log("url - ", url);
  console.log("val - ", value);

  const searchCustomer = async () => {
    setError(false);
    setLoading(true);
    //    e.preventDefault();
    if (value == "") {
      alert("Please input item to search");
    }

    try {
      const search = await axios
        .post(
          url,
          {
            meterNumber: parseInt(value),
          },
          {
            withCredentials: true,
          },
        )
        .catch((error) => {
          console.log("error", error);
          toast.error("Invalid meter number", {
            position: "bottom-center",
          });
        });
      console.log("search", search.data.data);
      if (search.status == 200) {
        setSearchedCustomer(search.data.data);
      } else {
        toast.warn("Customer not found!");
      }
    } catch (error) {
      console.log("Error", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  <ToastContainer />;
  return { searchCustomer, searchedCustomer, error, loading };
};
