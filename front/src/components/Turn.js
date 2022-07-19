import styled from "styled-components";
import theme from "../styles/theme";

const Turn = () => {
  const arr = [
    "리즌",
    "일하는네오",
    "지구",
    "권경",
    "머리빗는 네오",
    "프로도",
    "아이스크림 네오",
    "윰",
    "귤",
    "어피치",
    "미미",
  ];

  const length = arr.length;

  //현재 날짜 가져오기
  let now = new Date(),
    //다이어리 시작일
    startDay = new Date("2022/07/01"),
    //다이어리 종료일
    endDay = new Date("2022/12/31").getTime(),
    // 종료일 - 현재날짜
    gap = endDay - now,
    //종료일 - 시작일 - 1
    fixdgap = endDay - startDay - 1,
    result = Math.floor(gap / (1000 * 60 * 60 * 24)),
    fixdresult = Math.floor(fixdgap / (1000 * 60 * 60 * 24));

  const turn = (fixdresult - result) % length;

  return (
    <Div>
      <div>💙</div>
      &nbsp;오늘은&nbsp;<b>{arr[turn]}</b>&nbsp;님이 일기 작성하는
      날입니다&nbsp;
      <div>💙</div>
    </Div>
  );
};

const Div = styled.div`
  @media ${theme.device.mobile} {
    display: flex;
    flex-direction: column;

    margin: 2rem auto;
    font-size: 0.9rem;
    line-height: 1.5rem;
  }

  @media ${theme.device.desktop} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;

    margin: 4rem auto 0 auto;
    font-size: 1.1rem;
  }
`;
export default Turn;
