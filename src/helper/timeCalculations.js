import moment from "moment";

export const timeCalculations = ({ mytime = new Date() }) => {
    console.log(moment().format('YMMDD000000'));

  if (moment(mytime).isSame(new Date(), "weeks")) {
    return "weeks";
  } else if (moment(mytime).isSame(new Date(), "months")) {
    return "months";
  } else if (moment(mytime).isSame(new Date(), "years")) {
    return 'years';
  }else{
    return "";
  }

};
