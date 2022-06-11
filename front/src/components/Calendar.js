import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
//import Text from "./Text";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "../styles/GlobalStyle";
import styled from "styled-components";
// import { useSetRecoilState } from "recoil";
// import { date } from "../recoil/date";
import { useEffect, useState } from "react";

const Calendar = ({ showClickedDate }) => {
  const [startDate, setStartDate] = useState(new Date());
  //const setDate = useSetRecoilState(date); //리코일에 날짜값 저장

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

  console.log("startDate", startDate);
  const handlerOnChange = date => {
    // setDate(dateToStringText(startDate));
    setStartDate(date);
    console.log("캘린더 date", date);
  };

  //클릭한 날짜값을 스트링으로 변환 후  Home의 onclick이벤트 실행
  useEffect(() => {
    showClickedDate(dateToStringText(startDate));
  }, [showClickedDate, startDate]);

  return (
    <CalendarContent>
      <DatePicker
        selected={startDate}
        onChange={date => handlerOnChange(date)}
        locale={ko} //한글로 변경
        inline //인라인으로 바로 띄움
        maxDate={new Date()} //당일 이후 선택 불가
        //dateFormat='YY-MM-DD'
        //popperPlacement='auto' //팝업 가운데로
      />
    </CalendarContent>
  );
};

const CalendarContent = styled(Container)`
  height: auto;
  margin-top: 2.5rem;
`;
export default Calendar;
