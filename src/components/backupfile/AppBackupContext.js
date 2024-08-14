import React, { Fragment } from "react";
// import { CountProvider, useCount } from "./contexts/countContext";
import HeaderMain from "./components/HeaderMain";
import { AuthProvider } from "./contexts/auth-context";
import { GalleryProvider } from "./contexts/gallery-context";
import PhotoList from "./components/gallery/PhotoList";
import CartList from "./components/gallery/CartList";

// function CountDisplay() {
//   const [count] = useCount();
//   return <div>The count is: {count}</div>;
// }

// function Counter() {
//   const [, setCount] = useCount();
//   const increment = () => setCount((c) => c + 1);
//   return (
//     <button
//       onClick={increment}
//       className="p-5 text-white rounded-lg bg-blue-400 font-semibold"
//     >
//       Increment count
//     </button>
//   );
// }

const App = () => {
  return (
    <Fragment>
      {/* <div className="p-5 flex items-center justify-center gap-x-5">
        <CountProvider>
          <CountDisplay></CountDisplay>
          <Counter></Counter>
        </CountProvider>
      </div> */}
      <AuthProvider>
        <GalleryProvider>
          <HeaderMain></HeaderMain>
          <PhotoList></PhotoList>
          <CartList></CartList>
        </GalleryProvider>
      </AuthProvider>
    </Fragment>
  );
};

export default App;
