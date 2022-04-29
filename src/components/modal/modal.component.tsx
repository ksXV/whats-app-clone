import * as React from "react";

import "./modal.styles.scss";

interface ModalProps {
  logUserOut: () => void;
}

const Modal: React.FC<ModalProps> = ({ logUserOut }) => {
  return (
    <div className="w-44 h-48 absolute top-12 left-52 bottom-0 right-0 rounded bg-gray-500 shadow-xl z-50">
      <div className="py-3 w-[100%] h-[100%]">
        <h3 className="modal__options unselectable-text" onClick={logUserOut}>
          Disconnect
        </h3>
        <h3 className="modal__options unselectable-text">Disconnect</h3>
        <h3 className="modal__options unselectable-text">Disconnect</h3>
      </div>
    </div>
  );
};
export default Modal;
