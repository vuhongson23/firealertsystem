import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function useHackerNewsAPI(initialUrl, initialData) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const handleFetchData = useRef({});
  const isMounted = useRef(true);
  console.log("isMounted.current begin:", isMounted.current);
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    //
    isMounted.current = true;
    return () => {
      // Unmouted component
      isMounted.current = false;
    };
  }, []);

  handleFetchData.current = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (isMounted.current) {
        setData(response.data || []);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(`The error happened ${error}`);
    }
  };
  // const handleUpdateQuery = lodash.debounce((e) => {
  //   setQuery(e.target.value);
  // }, 500);
  useEffect(() => {
    handleFetchData.current();
  }, [url]);
  return {
    loading,
    setUrl,
    errorMessage,
    data,
  };
}
