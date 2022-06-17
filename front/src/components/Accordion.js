import { useCallback, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getDno } from "../recoil/diary";
import { call } from "../service/ApiService";

function Accordion(props) {
  const parentRef = useRef();
  const childRef = useRef();
  const { dno } = props;
  const [isCollapse, setIsCollapse] = useState(false);
  const setDno = useSetRecoilState(getDno); //수정페이지에 보낼 게시물 dno 저장 (수정페이지에서 dno별 다이어리를 가져오기 위해서)
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
    setDno(dno);
    navigate(`/diary/modify`);
  };

  //다이어리 삭제
  const deleteDiaryOnclick = () => {
    if (confirm("삭제 시 되돌릴 수 없습니다. 정말 삭제하시겠습니까?")) {
      call("/diary/remove", "DELETE", { dno }).then(response => {
        console.log(response);
      });
      alert("삭제되었습니다.");
    }
  };

  return (
    <Container>
      <Header onClick={handlerButtonClick}>
        {props.idx} / {props.title}
        <Button>{buttonText}</Button>
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>
          {props.contents}
          <p>작성일자 : {props.yyyymmdd}</p>
        </Contents>
      </ContentsWrapper>
      <ButtonWrapper>
        <EditButton onClick={modifyDiaryOnclick}>수정</EditButton>
        <EditButton onClick={deleteDiaryOnclick}>삭제</EditButton>
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: fles;
  position: relative;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem auto;
  border-radius: 4px;
  border: 1px solid silver;
  overflow: hidden;
`;

const Header = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 32px;
  /* margin: 0 32px 0 8px; */
  padding: 0.5rem;
  border-bottom: 1px solid lightgray;
  /* background-color: red; */
  width: 90vw;
`;

const ContentsWrapper = styled.div`
  height: 0;
  width: inherit;
  padding: 0 8px;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
`;

const Contents = styled.div`
  padding: 1.2rem 0.5rem;
`;

const Button = styled.div`
  top: 8px;
  right: 8px;
  font-size: 14px;
  position: absolute;
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
`;

const EditButton = styled.button`
  background-color: transparent;
  border: none;
  /* background-color: red; */
  padding: 0.2rem 2rem;
`;
export default Accordion;
