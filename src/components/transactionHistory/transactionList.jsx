import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TransactionCard from "../cards/transactionCard";
import moment from "moment";
import _ from "lodash";
import Pagination from "../customPaginations/paginations";
const defaultFilter = {
  from: "",
  to: "",
  category: "",
  search: "",
};
let PageSize = 2;

export default function TransactionList({ filterList = defaultFilter }) {
  const { transactions } = useSelector((state) => state.transactions);
  let totalResultData = 0;

  const [currentPage, setCurrentPage] = useState(1);

  const currentTransactionsData = useMemo(() => {
    const resultFilterText = filterByText(filterList, transactions);
    const resultFilterDate = filterByDate(filterList, resultFilterText);
    const resultCategory = filterCategory(filterList, resultFilterDate);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    totalResultData = resultCategory?.length > 0 ? resultCategory?.length : 0;
    return resultCategory.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, transactions, filterList]);

  const allTransactions = _.orderBy(
    currentTransactionsData,
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
  return (
    <div className="mt-5">
      
      <h4 className="fw-bold ">Top Last Transactions</h4>

      <div>
        {allTransactions?.length > 0 ? (
          allTransactions
        ) : (
          <span>there is no transaction</span>
        )}
      </div>
      {/* NOTE: only show when is needed, totalResultData is must more than pagesize for showing this; */}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalResultData}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

const filterCategory = (filterList, list) => {
  if (filterList.category && list?.length > 0) {
    return list.filter((eTrans) => {
      return eTrans.category === filterList.category;
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
