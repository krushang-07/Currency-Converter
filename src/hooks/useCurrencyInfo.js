import { useEffect, useState } from "react";
import axios from "axios";

const useCurrencyInfo = (currency) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await axios.get(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );
        setData(response.data[currency]);
        // console.log(response.data);
        // console.log(response.data[currency]);
      } catch (error) {
        setError("Error fetching currency data");
        console.error("Error fetching currency data:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is done
      }
    };

    fetchData();
  }, [currency]);
  return { data, loading, error };
};

export default useCurrencyInfo;
