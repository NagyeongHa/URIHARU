import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { date } from "../recoil/diary";
import { call } from "../service/ApiService";
import theme from "../styles/theme";
import { Button, StyledLink } from "../styles/GlobalStyle";
import { useNavigate } from "react-router-dom";

function DiaryEdit() {
  const navigate = useNavigate();
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
    try {
      call("/diary/create", "POST", diaryDTO);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //작성버튼 눌리면 create 매개변수(diaryDTO)에 diary내용담아서 처리
  const onButtonClick = () => {
    //유효성 테스트
    if (diary.title === "") {
      alert("제목을 입력해 주세요.");
      return;
    }
    if (diary.contents === "") {
      alert("내용을 입력해 주세요.");
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
            onChange={onChangeDiryInfo}
          />
        </div>

        <Button onClick={onButtonClick} className='btn'>
          작성
        </Button>
        <StyledLink to={"/"}>취소</StyledLink>
      </Container>
    </>
  );
}
const Container = styled.div`
  @media ${theme.device.mobile} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    height: 93vh;
    width: 95vw;
    flex-direction: column;
    margin: 0 auto;
  }

  @media ${theme.device.desktop} {
    margin: 4rem auto;
    height: auto;
    text-align: center;
  }
`;

const Input = styled.input`
  border-radius: 0.3rem;
  border: 1px solid gray;
  width: 85vw;
  height: 1.6rem;
  padding: 0.4rem;
  font-weight: 600;
  margin: 1.2rem auto;
  font-size: 1.1rem;

  @media ${theme.device.desktop} {
    width: 70vw;
    height: 1.9rem;
    font-size: 1.3rem;
  }
`;

const Textarea = styled.textarea`
  @media ${theme.device.mobile} {
    border-radius: 0.3rem;
    border: 1px solid gray;
    width: 85vw;
    padding: 0.4rem;
    font-size: 1.1rem;
    margin: 1.2rem auto;
    line-height: 1.4rem;
    overflow: scroll;
    height: 85vw;
  }

  @media ${theme.device.desktop} {
    border-radius: 0.3rem;
    overflow: scroll;
    width: 70vw;
    height: 40vw;
    line-height: 1.7rem;
    padding: 0.5rem;
    margin: 1.2rem auto;
    font-size: 1.1rem;
    margin-bottom: 4rem;
  }
`;

export default DiaryEdit;