import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import moment from "moment";
import "./modal.css";

const Modal = (props) => {
  const { show, onClose, title } = props;
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  const onSubmit = (e) => {
    console.log("submitted", e);

    e.preventDefault();
  };

  return (
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
          </div>
          <form
            onSubmit={onSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              margin: "auto",
            }}
          >
            <div className="modal-body">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                  }}
                >
                  <label className="form-label">Category</label>
                  <select className="form-input">
                    <option className="form-select-option" value="grapefruit">
                      Grapefruit
                    </option>
                    <option className="form-select-option" value="lime">
                      Lime
                    </option>
                    <option
                      className="form-select-option"
                      defaultValue
                      value="coconut"
                    >
                      Coconut
                    </option>
                    <option className="form-select-option" value="mango">
                      Mango
                    </option>
                  </select>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                  }}
                >
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-input"
                    max={moment().format("YYYY-MM-DD")}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                  }}
                >
                  <label className="form-label">Amount</label>
                  <div class="currency-wrap">
                    <span class="currency-code">$</span>
                    <input type="number" className="form-input text-currency" />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <label className="form-label">Type</label>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div className="radio-text">
                      <input
                        type="radio"
                        id="INCOME"
                        value="INCOME"
                        name="expense-type"
                      />
                      <label htmlFor="INCOME">Income</label>
                    </div>
                    <div className="radio-text" style={{ margin: "0px 10px" }}>
                      <input
                        type="radio"
                        id="EXPENSE"
                        value="EXPENSE"
                        name="expense-type"
                      />
                      <label htmlFor="EXPENSE">Expense</label>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                  }}
                >
                  <label className="form-label">Notes</label>
                  <textarea className="form-input" />
                </div>
              </div>
            </div>
          </form>
          <div className="modal-footer">
            <button onClick={onClose} className="close-button">
              Close
            </button>
            <input
              type="submit"
              value="Add Transaction"
              className="add-button-form"
            ></input>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
