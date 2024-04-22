import React, { useState } from "react";
import useHackerNewsAPI from "../hooks/useHackerNewsAPI";

const HackerNewsWithHook = () => {
  const [query, setQuery] = useState("");
  const { loading, setUrl, errorMessage, data } = useHackerNewsAPI(
    `https://hn.algolia.com/api/v1/search?query=''`,
    { hits: [] }
  );
  return (
    <div className="bg-white mx-auto mt-5 mb-5 p-5 rounded-lg shadow-md w-2/4">
      <div className="flex mb-5 gap-x-3">
        <input
          type="text"
          className="border border-gray-200 block w-full rounded-md focus:border-blue-400 p-3"
          placeholder="Typing your keyword..."
          defaultValue={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={() =>
            setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
          }
          className="bg-blue-500 text-white font-semibold rounded-md p-3 flex-shrink-0"
        >
          Fetching
        </button>
      </div>
      {loading && (
        <div className="loading w-8 h-8 rounded-full border-4 border-blue-500 border-r-4 border-r-transparent animate-spin mx-auto my-10"></div>
      )}
      {!loading && errorMessage && (
        <p className="text-red-400 my-5">{errorMessage}</p>
      )}
      <div className="flex flex-wrap gap-5">
        {!loading &&
          data.hits.length > 0 &&
          data.hits.map((item, index) => {
            console.log(item.title);
            if (!item.title || item.title.lengh <= 0) return null;
            return (
              <h3 className="p-3 bg-gray-100 rounded-md" key={item.title}>
                {item.title}
              </h3>
            );
          })}
      </div>
    </div>
  );
};

export default HackerNewsWithHook;
