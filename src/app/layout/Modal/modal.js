import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import moment from "moment";
import "./modal.css";
import * as _ from "lodash";
import { connect } from "react-redux";
import { addNewTransaction } from "../../../features/transactions/transactionsSlice";

const Modal = (props) => {
  const { show, onClose, title, addNewTransaction } = props;
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState(null);
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);
  const [type, setType] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      id: _.random(3, 1000),
      note: note,
      category: category,
      createdAt: date,
      type: type,
      amount: amount,
      currency: "$",
    };
    // check which is empty and insert into an array, and then from that array show the error message
    const emptyFields = [];
    Object.keys(transaction).forEach((key) => {
      if (
        transaction[key] == undefined ||
        transaction[key] == null ||
        transaction[key] == ""
      )
        emptyFields.push(key);
    });
    setErrors(emptyFields);
    if (!emptyFields.length > 0) {
      addNewTransaction(transaction);
      //   you can insert the transaction and work with it
      setCategory(null);
      setNote(null);
      setAmount(null);
      setDate(null);
      setType(null);
      onClose();
    }
  };

  const options = {
    income: ["Salary", "Loan", "Gift"],
    expense: ["Tech", "Food", "Bills", "Sports", "Health", "Clothes"],
  };

  const incomeOptions = _.map(options.income, (item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });
  const expenseOptions = _.map(options.expense, (item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  return (
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{title}</h4>
          </div>
          <form
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
                  {_.isNull(type) ? (
                    <p style={{ color: "red", fontSize: "10px" }}>
                      * Please select a type before choosing a transaction
                    </p>
                  ) : (
                    ""
                  )}

                  <select
                    className="form-input"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    disabled={_.isNull(type)}
                  >
                    {!_.isNull(type)
                      ? type == "INCOME"
                        ? incomeOptions
                        : expenseOptions
                      : ""}
                  </select>
                  {errors.length > 0 && errors.includes("category") ? (
                    <p style={{ color: "red", fontSize: "10px" }}>
                      * Please select a category
                    </p>
                  ) : (
                    ""
                  )}
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
                    onChange={(e) => {
                      const dateInMoment = moment(e.target.valueAsDate)
                        .startOf("day")
                        .toDate();
                      setDate(dateInMoment);
                    }}
                  />
                  {errors.length > 0 && errors.includes("date") ? (
                    <p style={{ color: "red", fontSize: "10px" }}>
                      * Please select a date
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                  }}
                >
                  <label className="form-label">Amount</label>
                  <div className="currency-wrap">
                    <span className="currency-code">$</span>
                    <input
                      type="number"
                      className="form-input text-currency"
                      min={0}
                      value={amount}
                      onChange={(e) => {
                        let { value, min } = e.target;
                        if (value > min) {
                          setAmount(value);
                        } else {
                          setAmount(min);
                        }
                      }}
                    />
                    {errors.length > 0 && errors.includes("amount") ? (
                      <p style={{ color: "red", fontSize: "10px" }}>
                        * Please enter a valid amount
                      </p>
                    ) : (
                      ""
                    )}
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
                    onChange={(e) => {
                      setType(e.target.value);
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
                    {errors.length > 0 && errors.includes("type") ? (
                      <p style={{ color: "red", fontSize: "10px" }}>
                        * Please select a type
                      </p>
                    ) : (
                      ""
                    )}
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
                  <textarea
                    className="form-input"
                    maxLength={350}
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  />
                  {errors.length > 0 && errors.includes("note") ? (
                    <p style={{ color: "red", fontSize: "10px" }}>
                      * Please fill your notes!
                    </p>
                  ) : (
                    ""
                  )}
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
              onClick={onSubmit}
            ></input>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
const mapStateToProps = (state) => ({
  transactions: state.transactions.transactions,
});

const mapDispatchToProps = {
  addNewTransaction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
