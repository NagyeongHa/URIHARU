import { useState } from "react";
import { call } from "../service/ApiService";
import "../styles/DiaryWrite.css";

function DiaryEdit() {
  // const writer = match.params.id;
  // console.log("writer", writer);
  const [diary, setDiary] = useState({ title: "", contents: "" });

  //제목, 작성자, 내용 onChange로 받아서 diary에 저장
  const onChangeDiryInfo = e => {
    const { name, value } = e.target;
    console.log(name, value);
    setDiary({
      ...diary,
      [name]: value,
    });
  };

  //다이어리 추가 API (create)
  const create = diaryDTO => {
    call("/diary/create", "POST", diaryDTO).then(response => {
      console.log(response);
      window.location.href = "/";
    });
  };

  //작성버튼 눌리면 create 매개변수(diaryDTO)에 diary내용담아서 비동기처리
  const onButtonClick = () => {
    create(diary);
  };
  //내용가져오는 api를 가져와서 그건 view state에 담아서 아이디가 있으면 viewstate 볼 수 있게?

  return (
    <>
    <div className="container">
      <div >
        <input className="titlebox" type='text' name='title' onChange={onChangeDiryInfo} placeholder="제목"/>
      </div>
      <div>
        <input type='hidden' name='writer' onChange={onChangeDiryInfo} />
      </div>
      <div>
        <input type='hidden' name='nickname' onChange={onChangeDiryInfo} />
      </div>
      <div>
      </div>
      <div>
        <textarea className="contents" placeholder="내용"
          type='text'
          name='contents'
          cols='30'
          rows='10'
          onChange={onChangeDiryInfo}
        />
      </div>
      
      <button onClick={onButtonClick} className="btn">작성하기</button>
      </div>
    </>
  );
}

export default DiaryEdit;
