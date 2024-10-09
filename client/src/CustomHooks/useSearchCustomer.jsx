import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
  


export const useSearchCustomer = (url) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [searchedCustomer, setSearchedCustomer] = useState();

   const searchCustomer = async (value) => {
     try {
       const search = await axios
         .post(
           url,
           {
             meterNumber: parseInt(value),
           },
           {
             withCredentials: true,
           }
         )
         .catch((error) => {
           console.log("error", error);
           toast.error("Invalid meter number", { position: "bottom-center" });
         });

       if (search.status == 200) {
        console.log('searched', search.data.data)
         setSearchedCustomer(search.data.data);
       } else {
         toast.warn("Customer not found!");
       }
     } catch (error) {
       console.log("Error", error);
     }
   }

  <ToastContainer />;
  return { searchCustomer, searchedCustomer, error, loading };
};
