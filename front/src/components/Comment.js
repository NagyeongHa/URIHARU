import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { dnoState } from "../recoil/diary";
import { call, callGetComment } from "../service/ApiService";
import theme from "../styles/theme";
import CommentItem from "./CommentItem";
import { FaRegCommentDots } from "react-icons/fa";

function Comment() {
  const getDno = useRecoilValue(dnoState);
  const [comment, setComment] = useState({ contents: "", dno: "" });
  const [commentArray, setCommentArray] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const { contents } = comment;

  //GET
  //댓글 가져오기
  useEffect(() => {
    callGetComment(getDno).then(response => setCommentArray(response.data));
  }, [getDno]);

  //댓글 작성 onChangeHandler
  const writecomment = e => {
    setComment({ contents: e.target.value, dno: getDno });
  };

  //댓글 작성 버튼 클릭 시
  const submitComment = () => {
    if (contents === "") {
      alert("댓글을 입력해 주세요");
      return;
    }

    callAddComment(comment);
    setComment({ contents: "" });
  };

  //POST
  //댓글 추가하기
  //async await 써서 저장(post) 후 다시 댓글 불러올 수 (get) 있도록
  const callAddComment = async comment => {
    try {
      await call("/reply/add", "POST", comment);
      callGetComment(getDno).then(response => setCommentArray(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  //댓글 아이콘 클릭시 댓글창 숨기기/보기
  const isShowComment = () => {
    setIsShow(!isShow);
  };
  console.log(commentArray);
  return (
    <Container>
      <IconWrapper>
        <FaRegCommentDots onClick={isShowComment} className='icon' />
        <b>{commentArray.length}</b>
      </IconWrapper>
      <hr />

      {isShow ? (
        <>
          {commentArray &&
            Object.values(commentArray).map(item => (
              <CommentItem comments={item} key={item.rno} />
            ))}

          <InputWrapper>
            <Textarea
              type='text'
              placeholder='댓글을 작성하세요'
              name='contents'
              onChange={writecomment}
              value={contents}
            />
            <Button onClick={submitComment}>등록</Button>
          </InputWrapper>
        </>
      ) : (
        ""
      )}
    </Container>
  );
}

const Container = styled.div`
  @media ${theme.device.desktop} {
    width: 60vw;
    margin: 4rem auto;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .icon {
    font-size: 1.3rem;
    text-align: left;
    display: block;
    padding: 1rem;
    cursor: pointer;

    @media ${theme.device.desktop} {
      font-size: 1.5rem;
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 2rem auto;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  flex-basis: 80%;
  font-size: 1rem;
  border-radius: 0.2rem 0 0 0.2rem;
  height: 3rem;

  @media ${theme.device.desktop} {
    height: 5rem;
  }
`;

const Button = styled.button`
  padding: 0.5rem;
  flex-basis: 20%;
  /* background-color: #eeeeee; */
  background-color: white;
  font-weight: bold;
  border: 1px solid gray;
  border-radius: 0 0.2rem 0.2rem 0;
`;
export default Comment;
