import { useCallback, useEffect, useState } from "react";
import { call, dateDiary } from "../service/ApiService";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { pathnameState } from "../recoil/diary";
import theme from "../styles/theme";
import { Button } from "../styles/GlobalStyle";
import { useLocation, useNavigate } from "react-router-dom";
import { yyyymmddState } from "../recoil/diary";
import TextEditer from "./TextEditer";

function DiaryEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = useRecoilValue(pathnameState);
  const yyyymmdd = useRecoilValue(yyyymmddState);
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false); //true 작성 false 수정
  const [diary, setDiary] = useState({
    title: "",
    yyyymmdd: yyyymmdd,
  });

  //yyyymmdd(날짜)별 다이어리 가져오기
  useEffect(() => {
    dateDiary(yyyymmdd).then(response => {
      //다이어리 있으면 다이어리 내용 저장
      if (response.length > 0) {
        setDiary(response[0]);
        setContent(response[0].contents);
        return;
      }

      //다이어리 있으면 수정페이지로 없으면 작성페이지로
      if (response.length === 0) {
        setIsEdit(true);
        return;
      }
    });
  }, [yyyymmdd, location]);

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

  const diaryValidation = () => {
    let validation = true;
    if (!diary.title) {
      alert("제목을 입력해 주세요.");
      validation = false;
      return;
    }
    if (!content) {
      validation = false;
      alert("내용을 입력해 주세요.");
    }
    return validation;
  };

  //작성버튼 눌리면 create 매개변수(diaryDTO)에 diary내용담아서 처리
  const writeHandler = () => {
    //유효성 테스트
    if (diaryValidation()) {
      write({
        title: diary.title,
        yyyymmdd: diary.yyyymmdd,
        contents: content,
      });
    }
  };

  //다이어리 작성 API
  const write = async diaryDTO => {
    try {
      await call("/diary/create", "POST", diaryDTO);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //수정버튼 눌리면 modify 매개변수(diaryDTO)에 diary내용담아서 처리
  const modifyHandler = () => {
    //유효성 테스트
    if (diaryValidation()) {
      modify({
        title: diary.title,
        dno: diary.dno,
        contents: content,
      });
    }
  };

  //다이어리 수정 API
  const modify = async diaryDTO => {
    try {
      await call("/diary/modify", "PUT", diaryDTO);

      //수정 후 메인->메인 , 마이페이지-> 마이페이지 각각 이동
      if (pathname === "/") {
        navigate("/");
        return;
      }
      navigate("/mypage");
    } catch (error) {
      console.log(error);
    }
  };

  //취소버튼 클릭 시
  const cancelHandler = () => {
    if (pathname === "/") {
      navigate("/");
      return;
    }
    navigate("/mypage");
  };
  return (
    <>
      <Container>
        <div>
          <Input
            placeholder=' 제목을 입력해주세요'
            type='text'
            name='title'
            value={diary.title}
            onChange={onChangeDiryInfo}
          />
        </div>
        <TextEditer content={content} setContent={setContent} />
        <>
          {isEdit ? (
            <Button onClick={writeHandler}>작성</Button>
          ) : (
            <Button onClick={modifyHandler}>수정</Button>
          )}
          <Button onClick={cancelHandler}>취소</Button>
        </>
      </Container>
    </>
  );
}
const Container = styled.div`
  @media ${theme.device.mobile} {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    height: 93vh;
    width: 95vw;
    flex-direction: column;
    margin: 0rem auto;
    margin-top: 1.4rem;
  }

  @media (min-width: ${theme.size.min_tablet}) {
    margin: 4rem auto;
    height: auto;
    text-align: center;
  }
`;

const Input = styled.input`
  letter-spacing: 0.06rem;
  font-family: inherit;
  letter-spacing: inherit;
  border-width: 0px 0px 1px 0px;
  outline: none;
  width: 90vw;
  height: 1.6rem;
  padding: 0.4rem;
  font-weight: 600;
  margin: 1.2rem auto;
  font-size: 1.2rem;

  @media (min-width: ${theme.size.min_tablet}) {
    width: 70vw;
    height: 1.9rem;
    font-size: 1.3rem;
  }
`;

// const Textarea = styled.textarea`
//   letter-spacing: 0.06rem;
//   font-family: inherit;
//   letter-spacing: inherit;
//   border-width: 0px 0px 1px 0px;
//   outline: none;
//   @media ${theme.device.mobile} {
//     width: 90vw;
//     padding: 0.4rem;
//     padding-bottom: 1rem;
//     margin: 1.2rem auto;
//     line-height: 2rem;
//     overflow: scroll;
//     height: 100vw;
//     font-size: 1.2rem;
//   }

//   @media (min-width: ${theme.size.min_tablet}) {
//     overflow: scroll;
//     width: 69.5vw;
//     height: 40vw;
//     line-height: 2.2rem;
//     padding: 0.7rem;
//     margin: 0.5rem auto;
//     font-size: 1.1rem;
//     margin-bottom: 4rem;
//   }
//   @media ${theme.device.tablet} {
//     height: 80vw;
//   }
// `;

export default DiaryEdit;
