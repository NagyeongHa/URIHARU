<<<<<<< HEAD
import { useState } from "react";
import DatePicker from "react-datepicker";
//import { ko } from "date-fns/esm/locale";

=======
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
//import Text from "./Text";
>>>>>>> origin
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
<<<<<<< HEAD

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      //locale={ko} //한글로 변경
      inline //인라인으로 바로 띄움
      //popperPlacement='auto' //팝업 가운데로
      dateFormat='yyyy.MM.dd(eee)'
    />
=======
//import { showClickedDate } from "../route/Home";

const Calendar = props => {
  const [startDate, setStartDate] = useState(new Date());

  // const year = startDate.getFullYear();
  // const month = startDate.getMonth();
  // const today = startDate.getDay();
  const showClickedDate = props.date;

  const handlerOnChange = date => {
    setStartDate(date);
    showClickedDate(startDate);
  };

  useEffect(() => {
    handlerOnChange();
  }, [startDate]);

  // if (startDate) {
  //   const test = startDate.split(" ");
  //   console.log("test", test[0]);
  // }
  // console.log("year", year, "month", month, "today", today);
  console.log(startDate);
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={date => handlerOnChange(date)}
        locale={ko} //한글로 변경
        inline //인라인으로 바로 띄움
        maxDate={new Date()} //당일 이후 선택 불가
        //  format="YY/MM/DD"
        //popperPlacement='auto' //팝업 가운데로
      />
    </>
>>>>>>> origin
  );
};

export default Calendar;
