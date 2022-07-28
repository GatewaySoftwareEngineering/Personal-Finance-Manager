import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { IoMdClose } from "react-icons/io";
import { BsCurrencyDollar } from "react-icons/bs";
import {
  FormControl,
  ListItemText,
  MenuItem,
  FilledInput,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { expenseCategories, incomeCategories } from "../../shared/constants";

const transactionFormInitial = {
  category: "",
  date: new Date(),
  amount: "",
  type: "INCOME",
  note: "",
};
const errorsInitial = {
  category: "",
  date: "",
  amount: "",
  type: "",
  note: "",
};

const AddTransactionDialog = ({
  openDialog,
  onCloseDialog,
  setTransactionsArray,
}) => {
  const [transactionForm, setTransactionForm] = useState(
    transactionFormInitial
  );
  const [errors, setErrors] = useState(errorsInitial);

  const categories =
    transactionForm.type === "INCOME" ? incomeCategories : expenseCategories;

  const categoryHandleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTransactionForm((prevValue) => ({
      ...prevValue,
      category: value,
    }));
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setTransactionForm((prev) => ({ ...prev, [name]: [value] }));
  };

  const dateHandleChange = (newValue) => {
    setTransactionForm((prevValue) => ({ ...prevValue, date: newValue?._d }));
  };

  const onRadioChanged = (e) => {
    setTransactionForm((prevValue) => ({
      ...prevValue,
      type: e.currentTarget.value,
    }));
  };

  const closeDialog = () => {
    onCloseDialog();
    setTransactionForm(transactionFormInitial);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (transactionForm.category === "") {
      return setErrors({
        ...errorsInitial,
        category: "Please select a category!",
      });
    }
    if (transactionForm.amount === "") {
      return setErrors({
        ...errorsInitial,
        amount: "Please enter an amount!",
      });
    }
    if (transactionForm.note === "" && transactionForm.note.length <= 350) {
      return setErrors({
        ...errorsInitial,
        note: "Please write a note and less than 350 characters!",
      });
    }

    setTransactionsArray((prev) => [
      ...prev,
      {
        ...transactionForm,
        amount: parseFloat(transactionForm.amount),
        createdAt: transactionForm.date,
        currency: "USD",
        id: Math.floor(Math.random() * 1000),
      },
    ]);

    onCloseDialog();
  };

  return (
    <>
      <Dialog
        maxWidth="lg"
        open={openDialog}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div>
          <DialogTitle id="alert-dialog-title">Add Transaction</DialogTitle>

          <IconButton
            aria-label="close"
            onClick={closeDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 4,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoMdClose />
          </IconButton>
        </div>

        <div className="dialog_content">
          <form className="dialog_form" onSubmit={onSubmit}>
            <div className="category_container">
              <label>Category</label>

              <FormControl sx={{ width: "100%" }}>
                <Select
                  size="small"
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  value={transactionForm.category}
                  onChange={categoryHandleChange}
                  input={
                    <FilledInput
                      className="category_input"
                      placeholder="Category"
                    />
                  }
                  renderValue={(selected) => selected}
                >
                  {categories.map((category) => (
                    <MenuItem
                      className="menu_item"
                      key={category}
                      value={category}
                    >
                      <ListItemText className="item" primary={category} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {errors.category && (
                <p className="error_message">{errors.category}</p>
              )}
            </div>

            <div className="date_container">
              <label>Date</label>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  value={transactionForm.date}
                  onChange={dateHandleChange}
                  renderInput={(params) => (
                    <TextField
                      sx={{ width: "100%" }}
                      className="date_picker_input"
                      variant="filled"
                      size="small"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            <div className="amount_container">
              <label>Amount</label>

              <div className="amount_input">
                <BsCurrencyDollar className="curency_icon" />
                <input
                  type="number"
                  min="0"
                  name="amount"
                  onChange={inputChangeHandler}
                />
              </div>

              {errors.amount && (
                <p className="error_message">{errors.amount}</p>
              )}
            </div>

            <div className="type_container">
              <label>Type</label>
              <div className="radio_container">
                <div>
                  <input
                    type="radio"
                    name="type"
                    id="income"
                    value="INCOME"
                    checked={transactionForm.type === "INCOME"}
                    onChange={onRadioChanged}
                  />
                   <label>Income</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="type"
                    id="expense"
                    value="EXPENSE"
                    checked={transactionForm.type === "EXPENSE"}
                    onChange={onRadioChanged}
                  />
                   <label>Expense</label>
                </div>
              </div>
            </div>

            <div className="note_container">
              <label>Note</label>
              <textarea
                name="note"
                id="note"
                rows="7"
                maxLength="350"
                onChange={inputChangeHandler}
              ></textarea>

              {errors.note && <p className="error_message">{errors.note}</p>}
            </div>

            <DialogActions className="dialog_actions">
              <Button className="dismiss_button" onClick={closeDialog}>
                Dismiss
              </Button>
              <Button
                className="add_transaction_button"
                type="submit"
                // onClick={closeDialog}
                autoFocus
              >
                Add Transaction
              </Button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default AddTransactionDialog;
