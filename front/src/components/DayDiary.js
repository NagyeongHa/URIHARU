import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../recoil/auth";
import { date, getDateDiary, getDno, pathnameState } from "../recoil/diary";
import { call } from "../service/ApiService";
import { Button } from "../styles/GlobalStyle";
import theme from "../styles/theme";

function DayDiary() {
  const navigate = useNavigate();
  const diary = useRecoilValue(getDateDiary); //날짜별 다이어리 가져오기
  const { id } = useRecoilValue(userState);
  const setDno = useSetRecoilState(getDno); //수정페이지에 보낼 게시물 dno 저장 (수정페이지에서 dno별 다이어리를 가져오기 위해서)
  const setPathName = useSetRecoilState(pathnameState); //수정페이지에서 수정 후 메인 / 마페 어디로 갈지 결정
  const clickeddate = useRecoilValue(date);

  //수정화면으로
  const goModifyOnClick = dno => {
    setDno(dno);
    setPathName(window.location.pathname);
    navigate(`/diary/modify`);
  };

  //삭제 버튼 누를 시
  const deleteDiaryOnclick = () => {
    deleteDiary(diary[0]);
  };

  //다이어리 삭제
  const deleteDiary = diaryDTO => {
    if (confirm("삭제 시 되돌릴 수 없습니다. 정말 삭제하시겠습니까?")) {
      call("/diary/remove", "DELETE", diaryDTO);
      window.location.replace("/");
      alert("삭제되었습니다.");
    }
  };

  return (
    <Container>
      {Object.keys(diary).length > 0 ? (
        diary.map((list, idx) => (
          <div key={idx}>
            <Card>
              <Hr />
              <DiaryTitle>{list.title}</DiaryTitle>
              <DiaryNickname>{list.nickname}</DiaryNickname>
              <DiaryContents>{list.contents}</DiaryContents>
              <DateofDay>{list.yyyymmdd}</DateofDay>
              <Hr />
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
          <StyledLink to='diary/create'>{clickeddate} 일에 글쓰기</StyledLink>
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
    /* background-color: aliceblue; */
  }
`;

const Hr = styled.hr`
  border: 0.5px solid #aaaaaa;
  width: 20%;
  margin: 3rem auto;
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
    font-size: 0.9rem;
  }
`;

const DiaryContents = styled.p`
  line-height: 1.7rem;
  @media ${theme.device.desktop} {
    font-size: 1.1rem;
  }
`;

const DateofDay = styled.p`
  text-align: center;

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
