import React, { useState } from "react";
import ModalBase from "./components/modal/ModalBase";
import ModalAdvanced from "./components/modal/ModalAdvanced";
import TooltipAdvanced from "./components/tooltip/TooltipAdvanced";

const App = () => {
  const [openModalBase, setOpenModalBase] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="p-5 flex justify-center items-center h-screen">
      <button
        className="p-5 rounded-lg text-white bg-blue-500 ml-5"
        onClick={() => setOpenModalBase(true)}
      >
        Open Modal Base
      </button>
      <button
        className="p-5 rounded-lg text-white bg-blue-500 ml-5"
        onClick={() => setOpenModal(true)}
      >
        Open Modal
      </button>
      <ModalBase
        visible={openModalBase}
        onClose={() => setOpenModalBase(false)}
      >
        <div className="bg-white p-10 rounded-lg w-full max-w-[320px]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae
          cupiditate, ratione ipsa alias voluptates eius porro esse obcaecati,
          rerum enim ducimus provident aperiam, beatae eligendi. Corporis et
          officia accusantium exercitationem!
        </div>
      </ModalBase>
      <ModalAdvanced
        visible={openModal}
        onClose={() => setOpenModal(false)}
        heading="Welcome Back!"
        bodyClassName="w-full max-w-[400px] bg-white p-10 rounded-lg"
      >
        <div className="flex flex-col gap-3 mb-5">
          <label htmlFor="email" className="cursor-pointer text-sm">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            className="bg-[#E7ECF3] rounded-lg w-full p-4 text-sm leading-normal"
          />
        </div>
        <div className="flex flex-col gap-3 mb-5">
          <label htmlFor="password" className="cursor-pointer text-sm">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="bg-[#E7ECF3] rounded-lg w-full p-4 text-sm leading-normal"
          />
        </div>
        <button className="w-full bg-[#316BFF] rounded-lg p-4 text-white font-semibold text-xl">
          Sign in
        </button>
      </ModalAdvanced>
      <div className="inline-block ml-5">
        <TooltipAdvanced title="Tooltip">This is a tooltip</TooltipAdvanced>
      </div>
    </div>
  );
};

export default App;
