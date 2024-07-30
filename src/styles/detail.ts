import styled from "styled-components";
import palette from "../styles/palette";

export const DetailLayout = styled.article`
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  background-color: #fff;
  margin: 24px auto 0;
  font-family: "NanumSquareR";
  color: ${palette.slate800};
`;

export const DetailBox = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  background-color: #fff;
  margin: 24px auto 0;
  font-family: "NanumSquareR";

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TodoNameBox = styled.div`
  width: 100%;
  max-width: 588px;
  height: 50px;
  border-radius: 24px;
  border: 2px solid ${palette.slate900};
  display: flex;
  align-items: center;

  gap: 16px;
  margin-bottom: 16px;
`;

export const TodoBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${palette.slate900};
  background-color: #fefce8;
  margin-left: 14px;
`;

export const TodoSpan = styled.span`
  width: 100%;
  text-decoration: underline;
`;