import React from "react";
import { useGallery } from "../../contexts/gallery-context";

const CartList = () => {
  const { cartItems, removeFromCart } = useGallery();
  console.log("🚀 ~ CartList ~ cartItems:", cartItems);
  return (
    <div className="px-5 py-2">
      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <div className="pb-3 flex " key={item.id}>
            <img
              src={item.url}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 px-6 py-3 text-white rounded-lg ml-4 font-semibold"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default CartList;
