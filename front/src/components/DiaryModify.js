import { useState, useEffect } from "react";
import { call } from "../service/ApiService";
import { Link } from "react-router-dom";

function DiaryModify() {
  const [diary, setDiary] = useState({
    title: "",
    contents: "",
    writer: "",
  });
  const test = new Date();
  console.log(test);
  //다이어리 글 하루치 불러오기
  useEffect(() => {
    const getOneDayDiary = () => {
      const accessToken = localStorage.getItem("ACCESS_TOKEN");

      let headers = new Headers({
        "Content-Type": "application/json",
      });

      let options = {
        method: "get",
        headers: headers,
      };

      if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
      }

      return fetch("http://localhost:8080/uriharu/diary/read/14", options)
        .then(res => res.json())
        .then(data => setDiary(data)); //diary에 저장
    };

    getOneDayDiary();
  }, []);

  //제목, 작성자, 내용 onChange로 받아서 diary에 저장
  const onChangeDiryInfo = e => {
    const { name, value } = e.target;
    console.log(name, value);
    setDiary({
      ...diary,
      [name]: value,
    });
  };

  //다이어리 수정 API
  const modify = diaryDTO => {
    call("/diary/modify/14", "PUT", diaryDTO).then(response => {
      console.log(response);
    });
  };

  //작성버튼 눌리면 create 매개변수(diaryDTO)에 diary내용담아서 비동기처리
  const onButtonClick = () => {
    modify(diary);
  };

  console.log("prev", diary);
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
        <span>작성자</span>
        <input
          type='text'
          name='writer'
          value={diary.writer}
          onChange={onChangeDiryInfo}
        />
      </div>
      <div>
        <span> 날짜</span>
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
