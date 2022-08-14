import { useCallback, useState } from "react";
import { useRef } from "react";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { pathnameState, yyyymmddState } from "../recoil/diary";
import { call } from "../service/ApiService";
import theme from "../styles/theme";
import "react-quill/dist/quill.bubble.css";

function Accordion(props) {
  const parentRef = useRef();
  const childRef = useRef();
  const { dno, yyyymmdd } = props;
  const [isCollapse, setIsCollapse] = useState(false);
  const location = useLocation();
  const setPathName = useSetRecoilState(pathnameState);
  const setYyyymmdd = useSetRecoilState(yyyymmddState);
  const navigate = useNavigate();

  //Header 클릭 시 내용물 보여주기
  const handlerButtonClick = useCallback(
    event => {
      event.stopPropagation();
      if (!parentRef.current || !childRef.current) {
        return;
      }

      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = "0";
        parentRef.current.style.background = "white";
        return;
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse]
  );

  const parentRefHeight = parentRef.current?.style.height ?? "0px";
  const buttonText = parentRefHeight === "0px" ? "열기" : "닫기";

  //다이어리 수정
  const modifyDiaryOnclick = () => {
    setYyyymmdd(yyyymmdd); //수정페이지에서 yyyymmdd 값으로 다이어리 불러옴
    setPathName(location.pathname); //수정페이지에서 수정 후 메인 / 마페 어디로 갈지 결정
    navigate("/diary/edit");
  };

  //다이어리 삭제
  const deleteDiaryOnclick = async () => {
    try {
      if (confirm(`삭제 시 되돌릴 수 없습니다. 정말 삭제하시겠습니까?`)) {
        await call("/diary/remove", "DELETE", { dno: dno });
        alert("삭제되었습니다.");
        navigate("/mypage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header onClick={handlerButtonClick}>
        <div>{props.idx}</div>
        <Hr />
        <HeaderTitle>{props.title}</HeaderTitle>
        <Button>{buttonText}</Button>
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>
          <ReactQuill theme='bubble' value={props.contents} readOnly='true' />
          <Date>{props.yyyymmdd}</Date>
        </Contents>
      </ContentsWrapper>
      <ButtonWrapper>
        <EditButton onClick={modifyDiaryOnclick}>수정</EditButton>
        <Hr />
        <EditButton onClick={deleteDiaryOnclick}>삭제</EditButton>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem auto;
  border-radius: 4px;
  border: 1px solid silver;
  overflow: hidden;
  width: 93vw;

  @media ${theme.device.desktop} {
    width: 70vw;
  }
`;

const Header = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 1.3rem 0.8rem;
  border-bottom: 1px solid lightgray;
  width: 90vw;
  word-break: keep-all;
`;

const HeaderTitle = styled.div`
  width: 12rem;
  line-height: 1.5rem;
  font-size: 1.1rem;

  @media ${theme.device.desktop} {
    width: 60vw;
  }
`;

const Hr = styled.hr`
  border-width: 1px;
  color: black;
  height: 100%;
  margin: 0 0.8rem;
`;

const Date = styled.div`
  color: gray;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.5rem;
`;

const ContentsWrapper = styled.div`
  height: 0;
  width: inherit;
  padding: 0 8px;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;

  .ql-container {
    font-family: inherit;
  }
  .ql-editor {
    padding: 1.2rem 0.5rem;
    line-height: 2.2rem;
    font-size: 1.1rem;
  }
`;

const Contents = styled.div`
  padding: 1.2rem 0.5rem;
  line-height: 1.7rem;
`;

const Button = styled.div`
  top: 15px;
  right: 8px;
  font-size: 14px;
  position: absolute;

  @media ${theme.device.desktop} {
    top: 5px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  /* background-color: red; */
  width: 90vw;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.6rem;

  @media ${theme.device.desktop} {
    width: 70vw;
  }
`;

const EditButton = styled.button`
  color: black;
  font-family: inherit;
  background-color: transparent;
  border: none;
  /* background-color: red; */
  padding: 0.2rem 2rem;
`;
export default Accordion;
