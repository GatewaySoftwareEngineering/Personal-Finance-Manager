import moment from 'moment';
import uniqid from 'uniqid';

export const mockData = [
  {
    id: uniqid().toString(),
    note: "My 1000 dollar monthly salary",
    category: "Salary",
    date: moment().format(),
    type: "Income",
    amount: 1000,
  },
]; 
