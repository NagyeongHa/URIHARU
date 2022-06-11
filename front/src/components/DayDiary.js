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

  //다이어리 삭제
  const deleteDiary = diaryDTO => {
    call("/diary/remove", "DELETE", diaryDTO).then(response => {
      console.log(response);
      navigate("/");
    });
  };

  //삭제 버튼 누를 시
  const deleteDiaryOnclick = () => {
    deleteDiary(diary);
  };

  return (
    <>
      <Diary>
        <>
          {diary ? (
            diary.map((list, idx) => (
              <div key={idx}>
                <div>
                  <p>제목</p>
                  {list.title}
                  <p>글쓴이</p>
                  {list.nickname}
                  <p>내용</p>
                  {list.contents}
                  <p>작성 날짜</p>
                  {list.yyyymmdd}
                  {list.writer === id ? (
                    <div>
                      <Button onClick={() => goModifyOnClick(list.dno)}>
                        수정하기
                      </Button>
                      <Button onClick={deleteDiaryOnclick}>삭제하기</Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>작성된 일기가 없습니다</p>
          )}
        </>
      </Diary>
    </>
  );
}

const Diary = styled.div`
  text-align: center;
`;

const Button = styled.button`
  border: none;
  font-size: 1rem;
  padding: 0.3rem 0.6rem;
  border-radius: 3rem;
`;
export default DayDiary;
