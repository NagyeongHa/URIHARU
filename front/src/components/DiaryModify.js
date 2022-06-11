import { useState, useEffect, useCallback } from "react";
import { call } from "../service/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { date } from "../recoil/date";
import { oneDayDiary } from "../recoil/auth";

function DiaryModify() {
  const navigate = useNavigate();
  const calendarData = useRecoilValue(date);
  const diaryData = useRecoilValue(oneDayDiary(calendarData));
  const initialstate = {
    title: diaryData.map(list => list.title),
    contents: diaryData.map(list => list.contents),
  };
  const [diary, setDiary] = useState(initialstate);

  useEffect(() => {
    setDiary(diaryData);
  }, [diary]);

  //제목, 작성자, 내용 onChange로 받아서 diary에 저장
  const onChangeDiryInfo = useCallback(
    e => {
      const { name, value } = e.target;
      console.log(diary);
      setDiary({
        ...diary,
        [name]: value,
      });
    },
    [diary]
  );

  //다이어리 수정 API
  const modify = diaryDTO => {
    call("/diary/modify", "PUT", diaryDTO).then(response => {
      console.log(response);
      navigate("/");
    });
  };

  //작성버튼 눌리면 create 매개변수(diaryDTO)에 diary내용담아서 처리
  const onButtonClick = () => {
    modify(diary);
  };

  console.log("diary", diary);
  return (
    <>
      <div>
        <span>제목</span>
        <input
          type='text'
          name='title'
          value={diary.title}
          onChange={onChangeDiryInfo}
        />
      </div>
      <div>
        <span>내용</span>
        <textarea
          type='text'
          name='contents'
          cols='30'
          rows='10'
          value={diary.contents}
          onChange={onChangeDiryInfo}
        />
      </div>
      <button onClick={onButtonClick}>수정</button>
      <Link to={"/"}>취소</Link>
    </>
  );
}
export default DiaryModify;
