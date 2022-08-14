import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { GlobalContainer } from "../styles/GlobalStyle";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { calendarState, yyyymmddState } from "../recoil/diary";
import theme from "../styles/theme";
import "../styles/calendar.css";

const Calendar = () => {
  /*
   setYyyymmdd 는 yyyy-mm-dd 형태로 다이어리를 get/post 할 때 파라미터값으로 사용
   getClickDate/setClickDate는 Wed Aug 10 2022 00:40:17 GMT+0900 형태로 달력클릭한 값을 전역으로 저장해서
   수정 또는 작성 후 메인페이지로 돌아왔을 때 달력 클릭한 값이 초기화돼서 오늘 날짜로 돌아가지않고 수정/작성했던 날을 그대롭 볼 수 있도록 함
  */
  const setYyyymmdd = useSetRecoilState(yyyymmddState);
  const [getClickDate, setClickDate] = useRecoilState(calendarState);

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
    setYyyymmdd(dateToStringText(date)); //리코일에 스트링 돌려서 저장
    setClickDate(date);
  };

  return (
    <Container>
      <MyDatePicker
        selected={getClickDate}
        onChange={date => handlerOnChange(date)}
        locale={ko} //한글로 변경
        inline //인라인으로 바로 띄움
        maxDate={new Date()} //당일 이후 선택 불가
      />
    </Container>
  );
};

const Container = styled(GlobalContainer)`
  height: auto;
  margin-top: 2.5rem;

  @media ${theme.device.desktop} {
    margin-top: 5rem;
    margin-bottom: 2rem;
  }
`;

const MyDatePicker = styled(DatePicker)`
  @media ${theme.device.desktop} {
    width: 90%;
    height: 3rem;
    font-size: 1.6rem;
    font-weight: bold;
    background-color: transparent;
    color: white;
    border: 1px solid;
  }
`;
export default Calendar;
