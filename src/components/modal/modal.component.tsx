import * as React from "react";

import "./modal.styles.scss";

interface ModalProps {
  logUserOut: () => void;
  toProfileDrawer: () => void;
  toFriendsList: () => void;
  isModalHidden: boolean;
}

const Modal: React.FC<ModalProps> = ({
  logUserOut,
  isModalHidden,
  toProfileDrawer,
  toFriendsList,
}) => {
  return (
    <div
      className={`${isModalHidden ? "modal-close" : "modal-open"
        } w-44 h-48 absolute rounded bg-[#1C272D] shadow-xl z-50`}
    >
      <div className="py-3 w-[100%] h-[100%]">
        <h3 className="modal__options unselectable-text" onClick={logUserOut}>
          Disconnect
        </h3>
        <h3
          className="modal__options unselectable-text"
          onClick={toProfileDrawer}
        >
          Go to profile
        </h3>
        <h3
          className="modal__options unselectable-text"
          onClick={toFriendsList}
        >
          Go to friends
        </h3>
      </div>
    </div>
  );
};
export default Modal;
