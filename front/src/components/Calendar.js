import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
//import Text from "./Text";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
//import { showClickedDate } from "../route/Home";

const Calendar = props => {
  const [startDate, setStartDate] = useState(new Date());
  const showClickedDate = props.date;

  const handlerOnChange = date => {
    setStartDate(date);
    // showClickedDate(dateToStringText(startDate));
  };

  useEffect(() => {
    showClickedDate(dateToStringText(startDate));
  }, [showClickedDate, startDate]);

  //선택한 달력 날짜 값을 연-월-일 형태로 변환
  const dateToStringText = date => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };

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
  );
};

export default Calendar;
