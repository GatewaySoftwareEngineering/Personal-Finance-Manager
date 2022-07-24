import moment from "moment";
import React from "react";
import { typeIncome } from "src/configs/constants";
import IconType from "./iconType";
import { ReactComponent as Bills } from "src/assets/images/bills-money.svg";

export default function TransactionCard({ type, note, time, amount }) {
  return (
    <div className="d-flex bg-white rounded py-3 px-3 align-items-center justify-content-between my-2">
      <div>
        <IconType type={type ?? ""} />
        <h5 className="d-inline ms-2">{note ?? ""}</h5>
      </div>
      <div>
        <span className="me-4">{moment(time).fromNow()}</span>
        <span
          className="badge p-2 px-3 text-nowrap"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(254, 205, 211,0.50),rgb(254, 205, 211,0.50))",
          }}
        >
          <span className="text-danger fs-6">$ {amount}</span>
        </span>
      </div>
    </div>
  );
}
