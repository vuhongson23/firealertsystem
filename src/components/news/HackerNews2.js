import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import lodash from "lodash";

const HackerNews2 = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("react");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [url, setUrl] = useState("");

  const handleFetchData = useRef();
  handleFetchData.current = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      console.log("responve: ", response);
      setHits(response.data.hits || []);
      setLoading(false);
    } catch (error) {
      setErrorMessage(`There is error happened ${error}`);
      setLoading(false);
    }
  };
  const handleUpdateQuery = lodash.debounce((e) => {
    setQuery(e.target.value);
  }, 500);
  useEffect(() => {
    handleFetchData.current();
  }, [url]);
  return (
    <div className="border bg-white p-5 mt-5 rounded-lg w-2/4 mx-auto shadow-md">
      <div className="flex mb-5 gap-x-3">
        <input
          type="text"
          defaultValue={query}
          placeholder="Typing your keyword..."
          onChange={handleUpdateQuery}
          className="border border-gray-300 p-3 rounded-lg w-full focus:border-blue-500"
        />
        <button
          onClick={() =>
            setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
          }
          className="p-5 bg-blue-600 text-white font-bold rounded-lg flex-shrink-0"
        >
          Fetch
        </button>
      </div>
      {loading && (
        <div className="w-8 h-8 rounded-full border-4 border-blue-500 border-r-transparent animate-spin mx-auto"></div>
      )}
      {!loading && errorMessage && (
        <p className="text-red-500">{errorMessage}</p>
      )}
      <div className="flex flex-wrap gap-3">
        {!loading &&
          hits.length > 0 &&
          hits.map((item, index) => (
            <h3 className="p-3 bg-gray-100 rounded-lg" key={item.title}>
              {item.title}
            </h3>
          ))}
      </div>
    </div>
  );
};

export default HackerNews2;
