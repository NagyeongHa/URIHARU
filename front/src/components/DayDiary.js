import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../recoil/auth";
import { yyyymmddState, dnoState, pathnameState } from "../recoil/diary";
import { call, dateDiary } from "../service/ApiService";
import { Button } from "../styles/GlobalStyle";
import theme from "../styles/theme";
import Comment from "./Comment";

function DayDiary() {
  const navigate = useNavigate();
  const location = useLocation();
  const yyyymmdd = useRecoilValue(yyyymmddState);
  const { id } = useRecoilValue(userState);
  const setDno = useSetRecoilState(dnoState); //수정페이지에 보낼 게시물 dno 저장 (수정페이지에서 dno별 다이어리를 가져오기 위해서)
  const setPathName = useSetRecoilState(pathnameState); //수정페이지에서 수정 후 메인 / 마페 어디로 갈지 결정
  const [diary, setDiary] = useState({});

  //다이어리 가져오기
  useEffect(() => {
    dateDiary(yyyymmdd).then(response => {
      setDiary(response);
      if (response.length > 0) {
        setDno(response[0].dno);
      }
    });
  }, [location, setDno, yyyymmdd]);

  //수정화면으로
  const goModifyOnClick = () => {
    setPathName(location.pathname);
    navigate("/diary/modify");
  };

  //삭제 버튼 누를 시
  const deleteDiaryOnclick = () => {
    deleteDiary(diary[0].dno);
  };

  //다이어리 삭제
  const deleteDiary = async dno => {
    try {
      if (confirm("삭제 시 되돌릴 수 없습니다. 정말 삭제하시겠습니까?")) {
        await call("/diary/remove", "DELETE", { dno: dno });
        alert("삭제되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {Object.keys(diary).length > 0 ? (
        Object.values(diary).map(list => (
          <div key={list.dno}>
            <Card>
              <DiaryTitle>{list.title}</DiaryTitle>
              <DiaryNickname>{list.nickname}</DiaryNickname>
              <DiaryContents>{list.contents}</DiaryContents>
              <DateofDay>{list.yyyymmdd}</DateofDay>
              <Comment />
            </Card>

            {list.writer === id ? (
              <div>
                <ButtonWrapper>
                  <Button onClick={() => goModifyOnClick(list.dno)}>
                    수정
                  </Button>
                  <Button onClick={deleteDiaryOnclick}>삭제</Button>
                </ButtonWrapper>
              </div>
            ) : (
              ""
            )}
          </div>
        ))
      ) : (
        <>
          <P>작성된 일기가 없습니다</P>
          <StyledLink to='diary/create'>{yyyymmdd} 일에 글쓰기</StyledLink>
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 92vw;
  margin: 0 auto;

  @media ${theme.device.desktop} {
    width: 60vw;
    text-align: center;
    margin-top: 4rem;
  }
`;

const Card = styled.div`
  margin-top: 4rem;
  text-align: center;

  @media ${theme.device.desktop} {
    border: none;
    margin-top: 0;
  }
`;

const DiaryTitle = styled.p`
  @media ${theme.device.mobile} {
    width: 80vw;
    margin: 0 auto;
    text-align: center;
    word-break: keep-all;
    font-size: 1.4rem;
    font-weight: bold;
  }

  @media ${theme.device.desktop} {
    margin: 0 auto 1.5rem auto;
    text-align: center;
    font-size: 1.7rem;
    word-break: keep-all;
  }
`;

const DiaryNickname = styled.p`
  @media ${theme.device.desktop} {
    font-size: 1rem;
  }
`;

const DiaryContents = styled.p`
  line-height: 2.1rem;
  font-size: 1.1rem;
  text-align: left;
  white-space: pre-wrap;

  @media ${theme.device.desktop} {
    line-height: 2.3rem;
  }
`;

const DateofDay = styled.p`
  text-align: left;
  padding-left: 0.3rem;

  @media ${theme.device.desktop} {
    font-size: 0.9rem;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const P = styled.p`
  text-align: center;
  margin: 3rem auto;
`;

const StyledLink = styled(Link)`
  border-radius: 15rem;
  border: none;
  padding: 10px;
  touch-action: auto;
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.text};

  text-decoration: none;
  height: 1.7rem;
  margin: 0 auto;
  text-align: center;
  display: block;
  width: 70vw;

  @media ${theme.device.desktop} {
    padding: 0.7rem 4rem;
    height: 1.7rem;
    width: 13rem;
  }
`;

export default DayDiary;
