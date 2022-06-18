<<<<<<< HEAD
import { useState } from "react";
=======
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { date } from "../recoil/diary";
>>>>>>> a7b5b50a54f64142b89d4cd2c459c2b2fa6ef460
import { call } from "../service/ApiService";
import "../styles/DiaryWrite.css";

function DiaryEdit() {
  const yyyymmdd = useRecoilValue(date);
  const [diary, setDiary] = useState({
    title: "",
    contents: "",
    yyyymmdd: yyyymmdd,
  });

  //제목, 작성자, 내용 onChange로 받아서 diary에 저장
<<<<<<< HEAD
  const onChangeDiryInfo = e => {
    const { name, value } = e.target;
    console.log(name, value);
    setDiary({
      ...diary,
      [name]: value,
    });
  };
=======
  const onChangeDiryInfo = useCallback(
    e => {
      const { name, value } = e.target;
      setDiary({
        ...diary,
        [name]: value,
      });
    },
    [diary]
  );
>>>>>>> a7b5b50a54f64142b89d4cd2c459c2b2fa6ef460

  //다이어리 추가 API (create)
  const create = diaryDTO => {
    call("/diary/create", "POST", diaryDTO).then(response => {
      console.log(response);
      window.location.href = "/";
    });
  };

  //작성버튼 눌리면 create 매개변수(diaryDTO)에 diary내용담아서 처리
  const onButtonClick = () => {
    create(diary);
  };
  //내용가져오는 api를 가져와서 그건 view state에 담아서 아이디가 있으면 viewstate 볼 수 있게?

  return (
    <>
<<<<<<< HEAD
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
=======
      <Container>
        <div>
          <Input
            className='titlebox'
            type='text'
            name='title'
            onChange={onChangeDiryInfo}
            placeholder='제목을 입력해주세요.'
          />
        </div>
        <div>
          <Textarea
            className='contents'
            placeholder='내용을 입력해주세요'
            type='text'
            name='contents'
            cols='30'
            rows='10'
            onChange={onChangeDiryInfo}
          />
        </div>

        <Button onClick={onButtonClick} className='btn'>
          작성하기
        </Button>
      </Container>
>>>>>>> a7b5b50a54f64142b89d4cd2c459c2b2fa6ef460
    </>
  );
}

export default DiaryEdit;
