import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error1, setError] = useState();
  const [loading1, setLoading] = useState();
  useEffect(() => {
    const meterData = async () => {
      try {
        setError(false);
        setLoading(true);
        const meterDetails = await axios
          // .get(`${process.env.REACT_APP_VITE_API_URL_BASE}/meters/${meter_id}`,
          .get(url, {
            withCredentials: true,
          })
          .catch((errors) => {
            setError("Something went wrong!!");
          });
        if (meterDetails.status == 200) {
          setData(meterDetails.data.data);
        }
      } catch (error) {
        setError("Server Error!! Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    meterData();
  }, []);

  return { data, error1, loading1 };
};
