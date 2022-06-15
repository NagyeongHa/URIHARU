import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { date } from "../recoil/diary";
import { call } from "../service/ApiService";

function DiaryEdit() {
  const yyyymmdd = useRecoilValue(date);
  const [diary, setDiary] = useState({
    title: "",
    contents: "",
    yyyymmdd: yyyymmdd,
  });

  //제목, 작성자, 내용 onChange로 받아서 diary에 저장
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

  //다이어리 추가 API (create)
  const create = diaryDTO => {
    call("/diary/create", "POST", diaryDTO).then(response => {
      console.log(response);
      window.location.href = "/";
    });
  };

  //작성버튼 눌리면 create 매개변수(diaryDTO)에 diary내용담아서 처리
  const onButtonClick = () => {
    //유효성 테스트
    if (diary.title === "") {
      alert("제목을 입력해 주세요");
      return;
    }
    if (diary.contents === "") {
      alert("내용을 입력해 주세요");
      return;
    }
    create(diary);
  };

  return (
    <>
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
    </>
  );
}

const Input = styled.input`
  border-radius: 0.3rem;
  border: 1px solid gray;
  height: 1.6rem;
  width: 90%;
  padding: 0.4rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Textarea = styled.textarea`
  border-radius: 0.3rem;
  border: 1px solid gray;
  width: 90%;
  padding: 0.4rem;
  overflow: scroll;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  line-height: 1.4rem;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  height: 93vh;
  width: 100vw;
  flex-direction: column;
`;

const Button = styled.button`
  border-radius: 0.3rem;
  border: none;
  width: 75%;
  padding: 10px;
  margin: 0 auto;
  touch-action: auto;
  background-color: rgb(253, 245, 232);
`;
export default DiaryEdit;
