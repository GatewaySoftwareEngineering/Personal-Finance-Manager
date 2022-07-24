import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { typeExpence, typeIncome } from "src/configs/constants";
import { addTransactions } from "src/features/transactions/transactionsSlice";
import InvalidField from "./invalidField";
import classes from "./Overview.module.css";
import { v1 as uuidv1 } from "uuid";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import CustomDatePicker from "../custom/customDatePicker";
/*/^(0|[1-9]\d*)(\.\d+)?$/*/
export default function AddTransactionForm(props) {
  const { handleClose } = props;
  const dispatch = useDispatch();
  const [dateTime, setDateTime] = useState(new Date());
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();

  const incomeCategory = Object.values(typeIncome).map(
    (eCategory) => eCategory
  );
  const expenseCategory = Object.values(typeExpence).map(
    (eCategory) => eCategory
  );
  //   const [type, setType] = useState("INCOME");
  const [listCategory, setListCategory] = useState(incomeCategory ?? []);
  useEffect(() => {
    setValue("type", "INCOME");
  }, []);
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value.type == "INCOME") {
        setListCategory(incomeCategory);
      } else {
        setListCategory(expenseCategory);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const onSubmit = (data) => {
    const newData = {
      id: uuidv1(),
      note: data?.note,
      category: data?.category,
      createdAt: moment(new Date(dateTime)).format(),
      type: data?.type,
      amount: data?.amount,
      currency: "USD",
    };
    dispatch(addTransactions(newData));
    handleClose();
  };

  return (
    <form className="row g-3 justify-content-around">
      <div className="col col-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-control"
        >
          {listCategory?.length > 0 ? (
            listCategory?.map((eCategory) => (
              <option value={eCategory} key={eCategory}>
                {eCategory.toLowerCase()}
              </option>
            ))
          ) : (
            <option value="">not found</option>
          )}
        </select>
        <InvalidField
          isRequaired={errors.category?.type}
          text={"category is required"}
        />
      </div>
      <div className="col col-3">
        <label htmlFor="createdAt" className="form-label">
          Date
        </label>
        <CustomDatePicker dateTime={dateTime} setDateTime={setDateTime} />
        <InvalidField
          isRequaired={errors.createdAt?.type}
          text={"Date is required"}
        />
      </div>
      <div className="col col-3 has-validation">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type={"number"}
          {...register("amount", {
            required: true,
          })}
          id="amount"
          className="form-control"
        />
        <InvalidField
          isRequaired={errors.amount?.type}
          text={"amount is required"}
        />
      </div>
      <div className="col col-12 row mt-5">
        <div className="d-flex col align-items-center  ">
          <label htmlFor="field-income" className=" d-flex align-items-center">
            <input
              {...register("type", { required: true })}
              type="radio"
              name="type"
              defaultValue="INCOME"
              onClick={() => {
                setValue("category", incomeCategory[0]);
              }}
              id="field-income"
              className="form-check-input me-1"
            />
            income
          </label>
          <label htmlFor="field-expense" className="d-flex align-items-center">
            <input
              {...register("type")}
              type="radio"
              name="type"
              onClick={() => {
                setValue("category", expenseCategory[0]);
              }}
              defaultValue="EXPENSE"
              id="field-expense"
              className="form-check-input mx-1"
            />
            expense
          </label>
        </div>
        <div className="col">
          <label htmlFor="note" className="form-label">
            Note
          </label>
          <textarea
            className="form-control"
            {...register("note", { required: true })}
            id="note"
            rows={3}
            defaultValue={""}
          />
          <InvalidField
            isRequaired={errors.note?.type}
            text={"note is required"}
          />
        </div>
      </div>
      <div className={classes.footerBotton}>
        <button
          className="me-3 btn btn-outline-dark rounded-pill fw-bolder"
          onClick={handleClose}
        >
          Dismiss
        </button>
        <button
          className={classes.footerAddButton}
          onClick={handleSubmit(onSubmit)}
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}
