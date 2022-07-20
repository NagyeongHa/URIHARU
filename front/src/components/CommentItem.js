import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dnoState } from "../recoil/diary";
import theme from "../styles/theme";

function CommentItem({ comments }) {
  const { nickname, contents, regdate } = comments;
  const [comment, setComment] = useState({ contents: contents, dno: "" });
  const [isEdit, setIsEdit] = useState(false);
  const getDno = useRecoilState(dnoState);
  //2022-07-20T05:25:29 => 2022-07-20 05:25:29 형식으로 변환
  const modifyRegdate = regdate.replace(/T/gi, " ");

  const editComment = e => {
    setComment({ contents: e.target.value, dno: getDno[0] });
  };

  console.log("comment", comment);
  console.log(comments);

  const isEditState = () => {
    setIsEdit(!isEdit);
    //수정 input 에서 글 작성하다가 취소누를 시 수정 input 박스에서 글 썼던 것 초기화
    if (!isEdit) {
      setComment({ ...comment, contents: contents });
    }
  };

  const callModifyComment = () => {
    //부모컴포넌트의 댓글 추가 함수
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
          <Button onClick={callModifyComment}>수정</Button>
        </InputWrapper>
      ) : (
        <Contents>{contents}</Contents>
      )}
      <ButtonWrapper>
        <Date>{modifyRegdate}</Date>
        <div>
          <span onClick={isEditState}>{isEdit ? "취소" : "수정"}</span>
          <span>삭제</span>
        </div>
      </ButtonWrapper>
      <hr />
    </>
  );
}

const Nickname = styled.div`
  text-align: left;
  padding: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;

  @media ${theme.device.desktop} {
    font-size: 0.9rem;
  }
`;

const Contents = styled.div`
  text-align: left;
  padding: 0.5rem;
  font-size: 1rem;
  word-break: break-all;

  @media ${theme.device.desktop} {
    font-size: 1.1rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0.5rem auto;
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

const Date = styled.div`
  text-align: left;
  font-size: 0.8rem;
  padding: 0.4rem;
  color: gray;

  @media ${theme.device.desktop} {
    font-size: 0.8rem;
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > div > span {
    font-size: 0.8rem;
    padding: 0.4rem;
    color: gray;
    cursor: pointer;
  }
`;
export default CommentItem;
