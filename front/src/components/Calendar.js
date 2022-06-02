import { useState } from "react";
import DatePicker from "react-datepicker";
//import { ko } from "date-fns/esm/locale";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

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
  );
};

export default Calendar;
