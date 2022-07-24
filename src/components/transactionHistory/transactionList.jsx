import React from "react";
import { useSelector } from "react-redux";
import TransactionCard from "../cards/transactionCard";
import moment from "moment";
import _ from "lodash";
const defaultFilter = {
  from: "",
  to: "",
  category: "",
  search: "",
};
export default function TransactionList({ filterList = defaultFilter }) {
  const { transactions } = useSelector((state) => state.transactions);
  let listTransactionCards = [];
  const filterDate = () => {
    let resultFilter = [];
    if (transactions && transactions?.length > 0) {
      const resultFilterText = filterByText(filterList, transactions);
      const resultFilterDate = filterByDate(filterList, resultFilterText);
      const resultCategory = filterCategory(filterList, resultFilterDate);
      resultFilter = resultCategory;
    }

    listTransactionCards = _.orderBy(
      resultFilter,
      ["createdAt"],
      ["desc"]
    )?.map((eTrans) => {
      return (
        <TransactionCard
          key={eTrans.id}
          amount={eTrans.amount}
          note={eTrans.note}
          type={eTrans.category}
          time={moment(eTrans.createdAt).format().toString()}
        />
      );
    });
  };
  filterDate();
  //TODO paginations
  return (
    <div className="mt-5">
      <h4 className="fw-bold ">Top Last Transactions</h4>

      {listTransactionCards.length == 0 ? (
        <span>there is no transaction </span>
      ) : (
        listTransactionCards
      )}
    </div>
  );
}

const filterCategory = (filterList, list) => {
  if (filterList.category && list?.length > 0) {
    return list.filter((eTrans) => {
      return eTrans.category == filterList.category;
    });
  } else {
    return list;
  }
};
const filterByText = (filterList, list) => {
  return list?.filter((eTransac) => {
    if (!filterList.search) return true;
    let note = eTransac.note.toLowerCase();
    let result = note.startsWith(filterList?.search.toLowerCase());
    return result;
  });
};
const filterByDate = (filterList, list) => {
  if (filterList?.from && filterList?.to) {
    return list.filter((eTrans) => {
      return moment(new Date(eTrans.createdAt)).isBetween(
        new Date(filterList.from),
        new Date(filterList.to)
      );
    });
  } else {
    return list;
  }
};
