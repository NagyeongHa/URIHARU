import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../recoil/auth";
import { yyyymmddState, pathnameState, dnoState } from "../recoil/diary";
import { call, dateDiary } from "../service/ApiService";
import { Button } from "../styles/GlobalStyle";
import theme from "../styles/theme";
import Comment from "./Comment";
import "react-quill/dist/quill.bubble.css";
import ReactQuill from "react-quill";
import { BsCloudHaze1 } from "react-icons/bs";

function DayDiary() {
  const navigate = useNavigate();
  const location = useLocation();
  const yyyymmdd = useRecoilValue(yyyymmddState);
  const { id } = useRecoilValue(userState);
  const setPathName = useSetRecoilState(pathnameState); //수정페이지에서 수정 후 메인 / 마페 어디로 갈지 결정
  const setDno = useSetRecoilState(dnoState);
  const [diary, setDiary] = useState({});
  //다이어리 가져오기
  useEffect(() => {
    dateDiary(yyyymmdd).then(response => {
      setDiary(response);

      //해당 다이어리 dno를 전역으로 저장해서 댓글 불러올 때 사용
      if (response.length > 0) {
        setDno(response[0].dno);
      }
    });
  }, [location, setDno, yyyymmdd]);

  //수정화면으로
  const moveDiaryEdit = () => {
    setPathName(location.pathname);
    navigate("/diary/edit");
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
              <ReactQuill
                theme='bubble'
                value={list.contents}
                readOnly='true'
              />
              <DateofDay>{list.yyyymmdd}</DateofDay>
              <Comment />
            </Card>

            {list.writer === id ? (
              <div>
                <ButtonWrapper>
                  <Button onClick={() => moveDiaryEdit(list.dno)}>수정</Button>
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
          <BsCloudHaze1 size='65' color='#cbcbcb' className='logo-icon' />
          <P>작성된 일기가 없습니다</P>
          <WriteButton onClick={moveDiaryEdit}>
            {yyyymmdd} 일에 글쓰기
          </WriteButton>
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

  .logo-icon {
    margin-top: 2.5rem;
  }
`;

const Card = styled.div`
  margin-top: 4rem;
  text-align: center;

  @media ${theme.device.desktop} {
    border: none;
    margin-top: 0;
  }
  .ql-container {
    font-family: inherit;
  }
  .ql-editor {
    line-height: 2.1rem;
    font-size: 1.1rem;
    letter-spacing: 0.06rem;
    padding: 0;
    white-space: pre-wrap;

    @media ${theme.device.desktop} {
      line-height: 2.3rem;
    }
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

const DateofDay = styled.p`
  text-align: left;

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
  margin: 1.5rem auto 3rem auto;
`;

const WriteButton = styled(Button)`
  font-size: 1.1rem;
  width: 87%;
  @media ${theme.device.tablet} {
    width: auto;
  }
  @media ${theme.device.desktop} {
    width: auto;
  }
`;
export default DayDiary;
