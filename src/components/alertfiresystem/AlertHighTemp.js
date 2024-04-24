import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AlertHighTemp = ({ message, icon, colors }) => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      {show && (
        <div className="fixed w-screen h-screen top-0 left-0 right-0 bottom-0 bg-gray-500/50">
          <div className="relative max-w-[430px] w-full h-auto bg-white rounded-lg shadow-lg top-1/4 left-1/2 -translate-y-2/4 -translate-x-2/4 border-black ">
            <div
              className={`flex justify-center ${colors} text-white text-[3.125rem] h-auto w-full rounded-t-lg rounded-b-none p-2 font-bold text-lg border-b-[1px]`}
            >
              <FontAwesomeIcon className="text-[3.125rem]" icon={icon} />
            </div>
            <div className="flex justify-center flex-col items-center p-3 pl-3 border-b-[1px] border-b-black">
              <p className="font-bold text-[2rem]">WARNING!</p>
              <p className="text-gray-500 text-[16px]">{message}</p>
            </div>
            <div className="p-3 flex justify-center">
              <button
                onClick={handleShow}
                className="w-[100px] h-[40px] bg-red-500 rounded-xl text-white hover:bg-green-500 hover:shadow-[0_0_19px_12px_rgba(141,236,180,0.5)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertHighTemp;
