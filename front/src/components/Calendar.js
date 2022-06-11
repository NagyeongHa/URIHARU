import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "../styles/GlobalStyle";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { date } from "../recoil/diary";
import { useState } from "react";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const setDate = useSetRecoilState(date); //리코일에 날짜값 저장

  //선택한 달력 날짜 값을 연-월-일 스트링 형태로 변환
  const dateToStringText = date => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0")
    );
  };

  //달력 날짜 클릭 시
  const handlerOnChange = date => {
    setDate(dateToStringText(date)); //리코일에 스트링 돌려서 저장
    setStartDate(date);
  };

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
