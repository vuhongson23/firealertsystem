import React from "react";
import { CSSTransition } from "react-transition-group";
import Portal from "../Portal";

const ModalBase = ({ visible, onClose, children, bodyClassName = "" }) => {
  return (
    <>
      <CSSTransition in={visible} timeout={250} unmountOnExit classNames="zoom">
        {(status) => {
          console.log(status);
          return (
            <Portal
              visible={status !== "exited"}
              onClose={onClose}
              containerClassName=" fixed z-[9999] inset-0 flex items-center justify-center"
              bodyStyle={{ transition: "all 250ms" }}
              bodyClassName={`relative z-10 content ${bodyClassName}`}
              overlay={true}
            >
              {children}
            </Portal>
          );
        }}
      </CSSTransition>
    </>
  );
};

export default ModalBase;
