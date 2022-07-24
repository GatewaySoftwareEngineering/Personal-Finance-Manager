import _ from "lodash";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CustomDatePicker from "src/components/custom/customDatePicker";
import TransactionList from "src/components/transactionHistory/transactionList";
import { typeExpence, typeIncome } from "src/configs/constants";
import classes from "src/components/transactionHistory/Transactions.module.css";
import Form from "react-bootstrap/Form";
export default function Transactions() {
  let [searchParams, setSearchParams] = useSearchParams();
  const refSearch = useRef(null);
  const refCategory = useRef(null);
  const incomeCategory = Object.values(typeIncome).map(
    (eCategory) => eCategory
  );
  const expenseCategory = Object.values(typeExpence).map(
    (eCategory) => eCategory
  );

  const [listCategory, setListCategory] = useState([
    ...incomeCategory,
    ...expenseCategory,
  ]);
  const [allFilter, setAllFilter] = useState({
    from: "",
    to: "",
    category: "",
  });

  useEffect(() => {
    document.title = "Transaction History";
  }, []);
  const onSearch = _.debounce((val) => {
    let filter = val.target.value;
    if (filter) {
      setSearchParams({ filter });
    } else {
      setSearchParams({});
    }
  }, 400);
  return (
    <div className="container px-2 mt-4">
      <div className="input-group mb-3 pe-2">
        <input
          ref={refSearch}
          defaultValue={searchParams.get("filter") || ""}
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={onSearch}
        />
        <span
          className="input-group-text text-white"
          style={{ backgroundColor: "var(--lightBlue)", cursor: "pointer" }}
          id="basic-addon2"
          onClick={() => {
            setSearchParams({});
            refSearch.current.value = "";
          }}
        >
          Clear
        </span>
      </div>
      <div className={"input-group mb-3 pe-2 py-3 w-100"}>
        <div
          className={[
            "d-flex justify-content-around form-control",
            classes.spaceFilter,
          ].join(" ")}
        >
          <Form.Select
            aria-label="Category Filter"
            className="form-control mx-1"
            ref={refCategory}
            onChange={(ev) =>
              setAllFilter({ ...allFilter, category: ev.target.value ?? "" })
            }
          >
            <option value={""}>All</option>
            {listCategory?.length > 0 ? (
              listCategory?.map((eCategory) => (
                <option value={eCategory} key={eCategory}>
                  {eCategory.toLowerCase()}
                </option>
              ))
            ) : (
              <option value="">not found</option>
            )}
          </Form.Select>

          <CustomDatePicker
            dateTime={allFilter.from}
            setDateTime={(from) => {
              setAllFilter({
                ...allFilter,
                from,
              });
            }}
            placeholderText="from"
          />

          <CustomDatePicker
            dateTime={allFilter.to}
            setDateTime={(to) =>
              setAllFilter({
                ...allFilter,
                to,
              })
            }
            pla
            placeholderText="to"
          />
        </div>

        <span
          className="input-group-text text-white"
          style={{ backgroundColor: "var(--lightBlue)", cursor: "pointer" }}
          id="basic-addon2"
          onClick={() => {
            setAllFilter({
              from: "",
              to: "",
              category: "",
            });
            refCategory.current.value = "";
          }}
        >
          Clear
        </span>
      </div>

      <TransactionList
        filterList={{
          from: allFilter.from ? moment(new Date(allFilter.from)).format() : "",
          to: allFilter.to ? moment(new Date(allFilter.to)).format() : "",
          category: allFilter.category,
          search: searchParams.get("filter"),
        }}
      />
    </div>
  );
}
