import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../recoil/auth";
import { dnoState } from "../recoil/diary";
import theme from "../styles/theme";

function CommentItem({ comments, modifyComment, deleteComment }) {
  const { nickname, contents, regdate, rno, writer } = comments;

  const getDno = useRecoilValue(dnoState);
  const { id } = useRecoilValue(userState);

  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = useState({
    contents: contents,
    dno: "",
    rno: "",
  });

  //2022-07-20T05:25:29 => 2022-07-20 05:25:29 형식으로 변환
  const replaceRegdate = regdate.replace(/T/gi, " ");
  const sliceRegdate = replaceRegdate.slice(replaceRegdate.indexOf("."));
  const date = replaceRegdate.replace(sliceRegdate, " ");

  //수정 onChange
  const editComment = e => {
    setComment({ contents: e.target.value, dno: getDno, rno: rno });
  };

  //수정버튼 클릭했을 때 수정 input칸 띄우기
  const isEditState = () => {
    setIsEdit(!isEdit);

    //수정 input 칸에서 글 수정하다가 취소누를 시 원래 댓글로 되돌리기
    if (!isEdit) {
      setComment({ ...comment, contents: contents });
    }
  };

  //수정 작성 버튼 클릭 시 변경된 댓글 데이터 comment(부모) 컴포넌트로 보냄
  const modifyCommentHandler = () => {
    modifyComment({
      contents: comment.contents,
      dno: getDno,
      rno: rno,
    });
    setIsEdit(false);
  };

  //삭제 버튼 클릭 시 삭제된 댓글 데이터 comment(부모) 컴포넌트로 보냄
  const deleteCommentHandler = () => {
    deleteComment({
      contents: comment.contents,
      dno: getDno,
      rno: rno,
    });
  };

  return (
    <>
      <Nickname>{nickname}</Nickname>
      {isEdit ? (
        <InputWrapper>
          <Textarea
            type='text'
            value={comment.contents}
            onChange={editComment}
            name='contents'
          />
          <Button onClick={modifyCommentHandler}>수정</Button>
        </InputWrapper>
      ) : (
        <Contents>{contents}</Contents>
      )}

      <ButtonWrapper>
        <Date>{date}</Date>
        {writer === id ? (
          <div>
            <span onClick={isEditState}>{isEdit ? "취소" : "수정"}</span>
            <span onClick={deleteCommentHandler}>삭제</span>
          </div>
        ) : null}
      </ButtonWrapper>
      <hr />
    </>
  );
}

const Nickname = styled.div`
  text-align: left;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;

  @media ${theme.device.desktop} {
    font-size: 1rem;
  }
`;

const Contents = styled.div`
  text-align: left;
  padding: 0.5rem;
  font-size: 1.1rem;
  line-height: 1.9rem;
  word-break: break-all;

  @media ${theme.device.desktop} {
    font-size: 1rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  margin: 0.3rem auto;
  height: 5rem;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  flex-basis: 80%;
  font-size: 1.1rem;
  border-radius: 0.2rem 0 0 0.2rem;
  height: auto;
  line-height: 1.8rem;

  @media ${theme.device.desktop} {
    font-size: 1rem;
  }
`;

const Date = styled.div`
  text-align: left;
  font-size: 0.9rem;
  padding: 0.4rem;
  color: gray;

  @media ${theme.device.desktop} {
    font-size: 0.8rem;
  }
`;

const Button = styled.button`
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > div > span {
    font-size: 0.9rem;
    padding: 0.4rem;
    color: gray;
    cursor: pointer;
  }
`;
export default CommentItem;
