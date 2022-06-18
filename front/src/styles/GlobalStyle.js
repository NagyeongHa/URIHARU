import styled from "styled-components";
export const GlobalInput = styled.input`
  height: 1.5rem;
  padding: 0.3rem;
  margin: 0.4rem;
  border-radius: 0.2rem;
  border: 0.5px solid gray;
  &:focus {
    border: 1px solid red;
  }
`;

export const GlobalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
`;

export const GlobalButton = styled.button`
  height: 2.5rem;
  padding: 0.3rem;
  margin: 0.3rem;
  border-radius: 0.2rem;
  border: none;
`;
