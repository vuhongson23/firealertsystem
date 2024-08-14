import { createContext, useContext, useState } from "react";
import useLocalStorage from "../components/hooks/useLocalStored";

const fakeData = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1720937172267-575f3575386b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isFavorite: false,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1718506921878-781af1aadaf2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isFavorite: false,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1720679816618-3fdc3504ac58?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isFavorite: false,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1720247522878-d6825f50d650?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isFavorite: false,
  },
  {
    id: 5,
    url: "https://plus.unsplash.com/premium_photo-1664551734513-7c7e0dd24fac?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isFavorite: false,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1718554517780-b9ca6513c4c3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isFavorite: false,
  },
];

const galleryContext = createContext();

function GalleryProvider(props) {
  const { storedValue, setValue } = useLocalStorage("photos", fakeData);
  const { storedValue: storedCart, setValue: setStoredCart } = useLocalStorage(
    "CartItems",
    []
  );
  const [photos, setPhotos] = useState(storedValue);
  const [cartItems, setCartItems] = useState(storedCart);
  // eslint-disable-next-line no-unused-vars
  const [favoriteList, setFavoriteList] = useState([]);

  function toggleFavorite(photoId) {
    const updatedArray = photos.map((photo) => {
      if (photo.id === photoId) {
        return { ...photo, isFavorite: !photo.isFavorite };
      }
      return photo;
    });
    setPhotos(updatedArray);
    setValue(updatedArray);
  }

  function addToCart(newItem) {
    setCartItems((prevItems) => {
      const isExisted = prevItems.some((item) => item.id === newItem.id);
      if (isExisted) {
        setStoredCart([...prevItems]);
        return [...prevItems];
      }
      setStoredCart([...prevItems, newItem]);
      return [...prevItems, newItem];
    });
  }

  function removeFromCart(photoId) {
    setCartItems((prevItems) => {
      const result = prevItems.filter((item) => item.id !== photoId);
      setStoredCart(result);
      return result;
    });
  }

  const value = {
    photos,
    cartItems,
    favoriteList,
    toggleFavorite,
    addToCart,
    removeFromCart,
  };
  return (
    <galleryContext.Provider value={value} {...props}></galleryContext.Provider>
  );
}

function useGallery() {
  const context = useContext(galleryContext);
  if (typeof context === "undefined")
    throw new Error("useGallery must be used within galleryProvider");
  return context;
}

export { useGallery, GalleryProvider };
