import styled from "styled-components";
export const Input = styled.input`
  width: 13rem;
  height: 1.5rem;
  padding: 0.3rem;
  margin: 0.3rem;
  border-radius: 0.2rem;
  border: 0.5px solid gray;
  &:focus {
    border: 1px solid red;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 97vh;
  margin: 0;
  text-align: center;
`;

export const Button = styled.button`
  width: 13.8rem;
  height: 2.5rem;
  padding: 0.3rem;
  margin: 0.3rem;
  border-radius: 0.2rem;
  border: none;
`;
