import styled from "styled-components";
import palette from "../styles/palette";
import media from "./media";

export const HeaderLayout = styled.div`
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid ${palette.slate200};
`;

export const HeaderBox = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const LogoBox = styled.div`
  width: 151px;
  height: 40px;
  background-image: url("/logoL.svg");

  ${media.medium`
    margin: 0 24px;
  `};

  ${media.small`
    margin: 0 16px;
    width: 71px;
    height: 40px;
    background-image: url("/logoS.svg");
  `};
`;
