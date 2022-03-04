import React, { useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useSpring, animated } from "react-spring";

const AddTransactionModal = ({ showModal, setShowModal }) => {
  const modalRef = useRef();
  const modalAnimation = useSpring({
    config: {
      duration: 300,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `scale(1)` : `scale(0)`,
  });
  return (
    showModal && (
      <div
        ref={modalRef}
        onClick={(e) => {
          if (modalRef.current === e.target) setShowModal(false);
          return;
        }}
        className="container fixed inset-0 flex h-screen w-full items-center justify-center bg-modal-drop bg-opacity-20"
      >
        <animated.div style={modalAnimation} className="h-modal w-[70%]">
          <div className="z-30 h-full w-full overflow-hidden rounded-2xl bg-white">
            <div className="scale flex h-14 items-center justify-between px-7 shadow-modal-header">
              <h4 className="text-base">Add transaction</h4>
              <button className="h-8 w-8" onClick={() => setShowModal(false)}>
                <MdOutlineClose className="h-full w-full" />
              </button>
            </div>
          </div>
        </animated.div>
      </div>
    )
  );
};

export default AddTransactionModal;
