import { useEffect, useState } from "react";
import { call } from "../service/ApiService";

function MyPage() {
  const [diary, setDiary] = useState([]);

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
      <h1>MaPage</h1>
      {diary.map((list, idx) => (
        <div key={idx}>
          <p>제목</p>
          {list.title}
          <p>글쓴이</p>
          {list.writer}
          <p>내용</p>
          {list.contents}
        </div>
      ))}
      {/* {diary.contents}
      {diary.writer} */}
    </>
  );
}
export default MyPage;
