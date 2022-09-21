import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../recoil/auth";
import { call } from "../service/apiService";
import { AiOutlineContainer } from "react-icons/ai";
import Accordion from "../components/mypage/Accordion";

function MyPage() {
  const [diary, setDiary] = useState([]);
  const { email } = useRecoilValue(userState);
  const location = useLocation();

  //내가 쓴 글 가져오기
  const getMyDiary = () => {
    call("/diary/myread", "GET", null).then(response => {
      setDiary(response.data);
    });
  };

  useEffect(() => {
    getMyDiary();
  }, [location]);

  return (
    <>
      <Title>
        {diary.length > 0 ? (
          <>
            <b>{email} </b> 님의 글 모아보기
          </>
        ) : (
          <>
            <AiOutlineContainer size='70' color='#cbcbcb' className='icon' />
            <p>작성된 글이 없습니다.</p>
          </>
        )}
      </Title>

      {diary.map((list, idx) => (
        <Accordion
          idx={idx + 1}
          title={list.title}
          contents={list.contents}
          yyyymmdd={list.yyyymmdd}
          key={list.dno}
          dno={list.dno}
        />
      ))}
    </>
  );
}

const Title = styled.div`
  text-align: center;
  font-size: 1.1rem;
  margin: 1.8rem auto;

  .icon {
    padding-top: 2rem;
  }
`;

export default MyPage;
