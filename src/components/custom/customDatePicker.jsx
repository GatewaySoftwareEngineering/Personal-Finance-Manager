import React from 'react'
import ReactDatePicker from 'react-datepicker';

export default function CustomDatePicker({dateTime,setDateTime,placeholderText=""}) {
  return (
    <ReactDatePicker
    selected={dateTime}
    onChange={(date) => {
      setDateTime(date);
    }}
    showTimeSelect
    dateFormat="Pp"
    className="form-control"
    isRequaired
    placeholderText={placeholderText}
  />
  )
}
