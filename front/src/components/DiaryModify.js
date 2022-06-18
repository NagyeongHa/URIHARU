import { useCallback, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getDnoDiary } from "../recoil/diary";

function DiaryModify() {
  const navigate = useNavigate();
  const DnoDiary = useRecoilValue(getDnoDiary); //dno별 다이어리 가져오기
  const [diary, setDiary] = useState({
    title: "",
    contents: "",
    writer: "",
  });

  console.log("diaryModify diary", DnoDiary);

  //다이어리 글 하루치 불러오기
  useEffect(() => {
    setDiary(DnoDiary);
  }, [DnoDiary]);

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

  //다이어리 수정 API
  const modify = diaryDTO => {
    call("/diary/modify", "PUT", diaryDTO).then(response => {
      console.log(response);
      navigate("/");
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
    modify(diary);
  };

  console.log("diary", diary);
  return (
    <>
    <Container>
      <div>
        <Input
        placeholder=" 제목을 입력해주세요"
          type='text'
          name='title'
          value={diary.title}
          onChange={onChangeDiryInfo}
        />
      </div>
      <div>
        <Textarea
         placeholder="내용을 입력해주세요"
          type='text'
          name='contents'
          cols='30'
          rows='10'
          value={diary.contents}
          onChange={onChangeDiryInfo}
        />
      </div>
      <Button onClick={onButtonClick}>수정</Button>
      <Button><StyledLink to={"/"}>취소</StyledLink></Button>
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
  margin-bottom:6px;
`;

const StyledLink = styled(Link)`

text-decoration: none;
color: black;
`;

export default DiaryModify;
