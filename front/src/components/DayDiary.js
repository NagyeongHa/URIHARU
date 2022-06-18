import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../recoil/auth";
import { getDateDiary, getDno } from "../recoil/diary";
import { call } from "../service/ApiService";

function DayDiary() {
  const navigate = useNavigate();
  const diary = useRecoilValue(getDateDiary); //날짜별 다이어리 가져오기
  const { id } = useRecoilValue(userState);
  const setDno = useSetRecoilState(getDno); //수정페이지에 보낼 게시물 dno 저장 (수정페이지에서 dno별 다이어리를 가져오기 위해서)

  //수정화면으로
  const goModifyOnClick = dno => {
    setDno(dno);
    navigate(`/diary/modify`);
  };

  console.log("daydiary", diary);

  //삭제 버튼 누를 시
  const deleteDiaryOnclick = () => {
    deleteDiary(diary[0]);
  };

  //다이어리 삭제
  const deleteDiary = diaryDTO => {
    call("/diary/remove", "DELETE", diaryDTO).then(response => {
      console.log(response);
      navigate("/");
    });
  };

  return (
    <>
      {diary.length > 0 ? (
        diary.map((list, idx) => (
          <div key={idx}>
            <Card>
              <Input value={list.title} readOnly />
              <DateofDay value={list.yyyymmdd} readOnly />
              <hr />
              <Input value={list.nickname} readOnly />
              <hr />
              <Contents>{list.contents}</Contents>
            </Card>
            {list.writer === id ? (
              <div>
                <ButtonWrapper>
                  <Button onClick={() => goModifyOnClick(list.dno)}>
                    수정하기
                  </Button>
                  <Button onClick={deleteDiaryOnclick}>삭제하기</Button>
                </ButtonWrapper>
              </div>
            ) : (
              ""
            )}
          </div>
        ))
      ) : (
        <P>작성된 일기가 없습니다</P>
      )}
    </>
  );
}

// const Button = styled.button`
//   border: none;
//   font-size: 1rem;
//   padding: 0.3rem 0.6rem;
//   border-radius: 3rem;
// `;
const Input = styled.input`
  border: none;
  width: 90%;
  text-align: center;
  font-size: 1rem;
  padding: 0.3rem 0.6rem;
  border-radius: 3rem;
  font-size: 17px;
  display: inline;
`;

const Card = styled.div`
  border: 1px solid grey;
  border-radius: 10px;
  margin-top: 10%;
  text-align: center;
`;

const Contents = styled.p``;

const DateofDay = styled.input`
  border: none;
  text-align: center;
  display: inline;
  width: 97%;
  height: 100%;
  color: grey;
  display: inline;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 30px;
  text-align: center;
`;

const Button = styled.button`
  border-radius: 0.3rem;
  border: none;
  width: 30%;
  padding: 10px;
  margin: 0 auto;
  touch-action: auto;
  background-color: rgb(253, 245, 232);
  margin: 0.5rem 0.7rem;
  font-size: 0.9rem;
`;

const P = styled.p`
  text-align: center;
  margin-top: 3rem;
`;
export default DayDiary;
