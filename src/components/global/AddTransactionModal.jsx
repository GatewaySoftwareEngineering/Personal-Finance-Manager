import React, { forwardRef, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useSpring, animated } from "react-spring";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { BsCalendar2 } from "react-icons/bs";

const customStyle = {
  container: (provided) => {
    return {
      ...provided,
      fontSize: "16px",
    };
  },
  indicatorSeparator: (provided) => {
    return {
      ...provided,
      display: "none",
    };
  },
};

const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <div
    className="flex items-center justify-between rounded-lg bg-white px-2 py-3 text-base shadow-date-input-inner"
    onClick={onClick}
    ref={ref}
  >
    {value}
    <span>
      <BsCalendar2 />
    </span>
  </div>
));

const AddTransactionModal = ({ showModal, setShowModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const modalRef = useRef();
  const modalAnimation = useSpring({
    config: {
      duration: 250,
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
          <div className="z-30 h-full w-full overflow-hidden rounded-2xl bg-slate-50">
            <div className="scale flex h-14 items-center justify-between bg-white px-7 shadow-modal-header">
              <h4 className="text-base">Add transaction</h4>
              <button className="h-8 w-8" onClick={() => setShowModal(false)}>
                <MdOutlineClose className="h-full w-full" />
              </button>
            </div>
            <form className="flex h-full w-full flex-col  px-10 pt-16 pb-11">
              <div>
                <div className="flex items-center gap-[52px]">
                  <div className="w-[18.75rem]">
                    <h4 className="mb-[10px] text-base capitalize">Category</h4>
                    <Select styles={customStyle} />
                  </div>
                  <div className="w-60">
                    <h4 className="mb-[10px] text-base capitalize">date</h4>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      customInput={<CustomDateInput />}
                    />
                  </div>
                  <div className="w-56">
                    <h4 className="mb-[10px] text-base capitalize">amount</h4>
                    <div className="flex items-center gap-1 overflow-hidden rounded-lg border border-input-gray bg-white px-2 outline-none">
                      <span className="text-input-gray">$</span>
                      <input
                        type="text"
                        name="amount"
                        id="amount"
                        className="h-full w-full bg-transparent px-1 py-3 text-base outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12 mb-[88px] flex justify-between">
                  <div className="w-1/3">
                    <h4 className="mb-7 text-base capitalize">type</h4>
                    <div className="flex gap-9">
                      <span className="flex items-center gap-2 text-base capitalize">
                        <input
                          type="radio"
                          name="transaction-type"
                          id="transaction-type"
                        />
                        income
                      </span>
                      <span className="flex items-center gap-2 text-base capitalize">
                        <input
                          type="radio"
                          name="transaction-type"
                          id="transaction-type"
                        />
                        expense
                      </span>
                    </div>
                  </div>
                  <div className="ml-16 w-2/3">
                    <h4 className="mb-7 text-base capitalize">note</h4>
                    <textarea
                      name="note"
                      id="note"
                      maxLength={350}
                      className="h-36 w-full resize-none rounded-lg border border-input-gray px-4 py-2 text-base outline-none"
                      placeholder="Write your note here. (Max 350 characters)."
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-end gap-9">
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-full border border-black px-4 py-2 text-xl font-medium capitalize"
                >
                  dismiss
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-blue-dark bg-opacity-15 px-4 py-2 text-xl font-semibold capitalize text-blue-dark"
                >
                  add transaction
                </button>
              </div>
            </form>
          </div>
        </animated.div>
      </div>
    )
  );
};

export default AddTransactionModal;
