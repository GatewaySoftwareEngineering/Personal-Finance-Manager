import React, { forwardRef, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useSpring, animated } from "react-spring";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { BsCalendar2 } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import { customTransactionCategorySelect } from "../../styles/customSelectStyle";

const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <button
    type="button"
    className="flex w-full items-center justify-between rounded-lg bg-white px-2 py-3 text-base shadow-date-input-inner"
    onClick={onClick}
    ref={ref}
  >
    {value}
    <span>
      <BsCalendar2 />
    </span>
  </button>
));

const Option = (props) => {
  const { data, innerRef, innerProps, isSelected } = props;
  return (
    <div
      {...innerProps}
      ref={innerRef}
      className="flex cursor-default items-center gap-2 p-2 hover:bg-blue-dark hover:bg-opacity-15"
    >
      <AiOutlineCheck
        className={`${isSelected ? "opacity-100" : "opacity-0"}`}
      />
      {data.label}
    </div>
  );
};

const expenseOptions = [
  { value: "tech", label: "Tech" },
  { value: "cloths", label: "Cloths" },
  { value: "bills", label: "Bills" },
  { value: "sports", label: "Sports" },
  { value: "health", label: "Health" },
  { value: "food", label: "Food" },
];

const incomeOptions = [
  { value: "salary", label: "Salary" },
  { value: "loan", label: "Loan" },
  { value: "gift", label: "Gift" },
];

const AddTransactionModal = ({ showModal, setShowModal }) => {
  const selectRef = useRef();
  const [startDate, setStartDate] = useState(new Date());
  const [modalData, setModalData] = useState({
    id: "",
    type: "EXPENSE",
    createdAt: startDate.toISOString(),
    amount: 0,
    note: "",
    category: "",
    currency: "USD",
  });
  const [errors, setErrors] = useState({
    category: false,
    note: false,
  });
  const modalRef = useRef();
  const modalAnimation = useSpring({
    config: {
      duration: 300,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `scale(1)` : `scale(0)`,
  });

  // 9 digits random number generator
  const getId = () => Math.floor(100000000 + Math.random() * 900000000);

  // handle input functions
  const handleRadioBtn = (e) => {
    selectRef.current.clearValue();
    setModalData({
      ...modalData,
      type: e.target.defaultValue.toUpperCase(),
    });
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setModalData({
      ...modalData,
      createdAt: date.toISOString(),
    });
  };

  const handleAmount = (event) => {
    setModalData({
      ...modalData,
      amount: event.target.value,
    });
  };

  const handleNote = (event) => {
    setModalData({
      ...modalData,
      note: event.target.value,
    });
  };

  const handleCategory = (categories) => {
    const categoryValues = categories.map((category) => category.value);
    const category = categoryValues.join(" ");
    setModalData({
      ...modalData,
      category: category,
    });
  };

  // Validations
  const validateForm = () => {
    const obj = { category: false, note: false };
    if (!modalData.note) obj.note = true;
    if (!modalData.category) obj.category = true;
    setErrors(obj);
    return Object.values(obj).every((element) => !element);
  };
  // Transaction form submit handler
  const handleTransactionSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      console.log("form is not valid");
      return;
    }
  };
  console.log(errors);

  return (
    showModal && (
      <div
        ref={modalRef}
        onClick={(e) => {
          if (modalRef.current === e.target) setShowModal(false);
          return;
        }}
        className="container fixed inset-0 z-30 flex h-screen w-full items-center justify-center bg-modal-drop bg-opacity-20"
      >
        <animated.div style={modalAnimation} className=" min-h-max w-[70%]">
          <div className="z-40 h-full w-full overflow-hidden rounded-2xl bg-slate-50">
            <div className="scale flex h-14 items-center justify-between bg-white px-7 shadow-modal-header">
              <h4 className="text-base">Add transaction</h4>
              <button
                type="button"
                className="h-8 w-8"
                onClick={() => setShowModal(false)}
              >
                <MdOutlineClose className="h-full w-full" />
              </button>
            </div>
            <form
              className="flex h-full w-full flex-col  px-10 pt-16 pb-11"
              onSubmit={handleTransactionSubmit}
            >
              <div>
                <div className="flex items-center gap-[52px]">
                  <div className="mt-5 w-[18.75rem]">
                    <h4 className="mb-[10px] text-base capitalize">Category</h4>
                    <Select
                      ref={selectRef}
                      options={
                        modalData.type.toLowerCase() === "expense"
                          ? expenseOptions
                          : incomeOptions
                      }
                      isMulti
                      components={{ Option }}
                      onChange={handleCategory}
                      className="w-full"
                      styles={customTransactionCategorySelect}
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      isClearable={false}
                      placeholder="Select transaction category"
                    />
                    <div className="h-5 text-xs text-red-500">
                      {errors.category && "please select one or more category"}
                    </div>
                  </div>
                  <div className="w-60">
                    <h4 className="mb-[10px] text-base capitalize">date</h4>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => handleDateChange(date)}
                      customInput={<CustomDateInput />}
                      showMonthDropdown
                      showYearDropdown
                      maxDate={new Date()}
                      dropdownMode="select"
                    />
                  </div>
                  <div className="w-56">
                    <h4 className="mb-[10px] text-base capitalize">amount</h4>
                    <div className="flex items-center gap-1 overflow-hidden rounded-lg border border-input-gray bg-white px-2 outline-none">
                      <span className="text-input-gray">$</span>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        min="0"
                        className="h-full w-full bg-transparent px-1 py-3 text-base outline-none"
                        onChange={handleAmount}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12 mb-[88px] flex justify-between">
                  <div className="w-1/3">
                    <h4 className="mb-7 text-base capitalize">type</h4>
                    <div className="flex gap-9" onChange={handleRadioBtn}>
                      <span className="flex items-center gap-2 text-base capitalize">
                        <input
                          type="radio"
                          name="transaction-type"
                          id="transaction-type"
                          value="income"
                        />
                        income
                      </span>
                      <span className="flex items-center gap-2 text-base capitalize">
                        <input
                          type="radio"
                          name="transaction-type"
                          id="transaction-type"
                          value="expense"
                          defaultChecked
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
                      onChange={handleNote}
                      maxLength={350}
                      className={`h-36 w-full resize-none rounded-lg border border-input-gray px-4 py-2 text-base outline-none ${
                        errors.note && "border-red-500"
                      }`}
                      placeholder="Write your note here. (Max 350 characters)."
                    />
                    <div className="h-5 text-xs text-red-500 ">
                      {errors.note && "please provide a note"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-end gap-9">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-full border border-black px-4 py-2 text-xl font-medium capitalize transition-all duration-300 hover:bg-black hover:text-white"
                >
                  dismiss
                </button>
                <button
                  type="submit"
                  className="rounded-full border border-transparent bg-blue-dark bg-opacity-15 px-4 py-2 text-xl font-semibold capitalize text-blue-dark transition-all duration-300 hover:border-blue-dark"
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
