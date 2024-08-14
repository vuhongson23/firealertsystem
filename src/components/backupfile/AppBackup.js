import { Fragment, useState } from "react";
import "./App.css";
import Modal from "./components/modal/Modal";
import DropDownPortal from "./components/DropdownPortal";
import Tooltip from "./components/tooltip/Tooltip";
import GameWithReducer from "./components/tictactoe/GameWithReducer";
import { ErrorBoundary } from "react-error-boundary";
import SignUpForm from "./components/form/SignUpForm";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="bg-red-100">
      <p className="p-5 text-red-500">
        Không thể lấy data do component đang lỗi
      </p>
    </div>
  );
}

function AppBackup() {
  return (
    <Fragment>
      {/* <div className="relative z-0">
        <Modal open={showModal} handleClose={() => setShowModal(false)}></Modal>
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="p-4 m-5 bg-blue-500 rounded-lg text-white font-medium"
      >
        Show modal
      </button>
      <div className="relative z-30">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore rem,
        cumque natus eveniet, maxime quae numquam eius earum nisi ab porro
        temporibus minima, voluptas labore quam illo? Quia, natus corrupti?
      </div> */}
      {/* <div className="overflow-hidden p-5">
        <DropDownPortal></DropDownPortal>
      </div> */}
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <GameWithReducer></GameWithReducer>
      </ErrorBoundary>
      <SignUpForm></SignUpForm>
    </Fragment>
  );
}

export default AppBackup;
