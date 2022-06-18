import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../recoil/auth";
import { call } from "../service/ApiService";

import Accordion from "./Accordion";

function MyPage() {
  const [diary, setDiary] = useState([]);
  const { email } = useRecoilValue(userState);

  //내가 쓴 글 가져오기
  const getMyDiary = () => {
    call("/diary/myread", "GET", null).then(response => {
      console.log(response);
      setDiary(response.data);
    });
  };

  useEffect(() => {
    getMyDiary();
  }, []);

  return (
    <>
      <Title>
        {diary.length > 0
          ? `${email} 님의 글 모아보기`
          : `작성된 글이 없습니다.`}
      </Title>

      {diary.map((list, idx) => (
        <Accordion
          idx={idx + 1}
          title={list.title}
          contents={list.contents}
          yyyymmdd={list.yyyymmdd}
          key={idx}
          dno={list.dno}
        />
      ))}
      {/* {diary.contents}
      {diary.writer} */}
    </>
  );
}

const Title = styled.div`
  text-align: center;
  font-size: 1.1rem;
  margin: 1.8rem auto;
`;

export default MyPage;
