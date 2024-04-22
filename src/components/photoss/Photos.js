import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const getRandomPhotos = async (page) => {
  try {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=8`
    );
    return response.data;
  } catch (error) {
    // handle error
    console.log(error);
  }
};
const Photos = () => {
  const [randomPhotos, setRandomPhotos] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const handleLoadMorePhotos = useRef();
  handleLoadMorePhotos.current = async () => {
    const images = await getRandomPhotos(nextPage);
    const newPhotos = [...randomPhotos, ...images];
    console.log(newPhotos);
    setRandomPhotos(newPhotos);
    setNextPage(nextPage + 1);
    console.log(nextPage);
  };
  useEffect(() => {
    handleLoadMorePhotos.current();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-4 gap-5 p-5">
        {randomPhotos.length > 0 &&
          randomPhotos.map((item, index) => (
            <div
              key={item.id}
              className="p-3 bg-white shadow-md rounded-lg h-[200px]"
            >
              <img
                src={item.download_url}
                alt={item.author}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          ))}
      </div>
      <div className="text-center">
        <button
          onClick={handleLoadMorePhotos.current}
          className="inline-block px-8 py-4 bg-purple-600 text-white"
        >
          Load more...
        </button>
      </div>
    </div>
  );
};

export default Photos;
