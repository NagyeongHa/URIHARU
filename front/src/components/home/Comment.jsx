import { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { dnoState } from "../../recoil/diary";
import { call, getComment } from "../../service/ApiService";
import theme from "../../styles/theme";
import CommentItem from "./CommentItem";
import { FaRegCommentDots } from "react-icons/fa";

function Comment() {
  const getDno = useRecoilValue(dnoState);
  const [comment, setComment] = useState({ contents: "", dno: "" });
  const [commentArray, setCommentArray] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const { contents } = comment;

  //댓글 아이콘 클릭시 댓글창 숨기기/보기
  const isShowComment = () => {
    setIsShow(!isShow);
  };

  //댓글 작성 onChange
  const commentOnChange = e => {
    setComment({ contents: e.target.value, dno: getDno });
  };

  //댓글 작성 버튼 클릭 시
  const submitComment = () => {
    if (contents === "") {
      alert("댓글을 입력해 주세요");
      return;
    }
    addComment(comment);
    setComment({ contents: "" });
  };

  //GET
  //댓글 가져오기
  useEffect(() => {
    getComment(getDno).then(response => setCommentArray(response.data));
  }, [comment, getDno]);

  //POST
  //댓글 추가
  const addComment = async comment => {
    try {
      await call("/reply/add", "POST", comment);
      getComment(getDno).then(response => setCommentArray(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  //PUT
  //댓글 수정
  const modifyComment = async commentItem => {
    try {
      await call("/reply/modify", "PUT", commentItem).then(response =>
        setCommentArray(response.data)
      );
      getComment(getDno).then(response => setCommentArray(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE
  //댓글 삭제
  const deleteComment = async commentItem => {
    try {
      if (confirm("삭제하시겠습니까?")) {
        await call("/reply/remove", "DELETE", commentItem);
      }
      getComment(getDno).then(response => setCommentArray(response.data));
    } catch (error) {
      console.log(error);
    }
  };

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
              <CommentItem
                comments={item}
                key={item.rno}
                modifyComment={modifyComment}
                deleteComment={deleteComment}
              />
            ))}

          <InputWrapper>
            <Textarea
              type='text'
              placeholder='댓글을 작성하세요'
              name='contents'
              onChange={commentOnChange}
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
  margin: 3rem auto;

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
    padding: 0.5rem;
    cursor: pointer;

    @media ${theme.device.desktop} {
      font-size: 1.5rem;
    }
  }
  & p {
    font: inherit;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  margin: 2rem auto;
  height: 5rem;
`;

const Textarea = styled.textarea`
  font-family: inherit;
  padding: 0.5rem;
  flex-basis: 80%;
  font-size: 1.1rem;
  border-radius: 0.2rem 0 0 0.2rem;
  height: auto;
  line-height: 1.9rem;

  @media ${theme.device.desktop} {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  font: inherit;
  color: black;
  height: auto;
  font-size: 1rem;
  padding: 0.5rem;
  flex-basis: 20%;
  /* background-color: #eeeeee; */
  background-color: white;
  font-weight: bold;
  border: 1px solid gray;
  border-radius: 0 0.2rem 0.2rem 0;
`;
export default Comment;
