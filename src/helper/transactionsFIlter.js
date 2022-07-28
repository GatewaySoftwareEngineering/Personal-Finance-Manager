import _ from "lodash";
import moment from "moment";

export const filterCategory = (filterList, list) => {
    if (filterList.category && list?.length > 0) {
      return list.filter((eTrans) => {
        return eTrans.category === filterList.category;
      });
    } else {
      return list;
    }
  };
  export const filterByText = (filterList, list) => {
    return list?.filter((eTransac) => {
      if (!filterList.search) return true;
      let note = eTransac.note.toLowerCase();
      let result = _.includes(note, filterList?.search.toLowerCase());
      if (!result) {
        result = _.includes(
          `${eTransac.amount}`,
          filterList?.search.toLowerCase()
        );
      }
  
      return result;
    });
  };
  export const filterByDate = (filterList, list) => {
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
  