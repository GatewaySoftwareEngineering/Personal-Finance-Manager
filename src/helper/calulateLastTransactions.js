import _ from "lodash";
import moment from "moment";

export const filterPerDate = (transactions, type) => {
  const today = moment().format();
  const result = _.orderBy(transactions, ["createdAt"], ["desc"])
    ?.slice(0, 10)
    ?.filter((eTransactions) => {
      if (
        moment(moment(eTransactions.createdAt).format()).isSame(today, type)
      ) {
        return eTransactions;
      }
    });
  if (result && result?.length > 0) {
    return result;
  } else {
    return [];
  }
};

// moment(moment(eTransactions.createdAt).format()).isSame(lastDate, 'year');
// moment(moment(eTransactions.createdAt).format()).isBetween(lastDate, today);
