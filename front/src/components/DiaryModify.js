import { useState, useEffect, useCallback } from "react";
import { call } from "../service/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getDno } from "../recoil/diary";

function DiaryModify() {
  const navigate = useNavigate();
  const dno = useRecoilValue(getDno);
  const [diary, setDiary] = useState({
    title: "",
    contents: "",
    writer: "",
  });

  console.log("dno", dno, "diaryData", diary);

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

      return fetch(`http://localhost:8080/uriharu/diary/read/${dno}`, options)
        .then(res => res.json())
        .then(data => setDiary(data)); //diary에 저장
    };

    getOneDayDiary();
  }, []);

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
