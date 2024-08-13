import styled from "styled-components";
import palette from "../styles/palette";
import media from "./media";

export const DetailLayout = styled.article`
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  margin: 0 auto;
  background-color: #fff;
  color: ${palette.slate800};

  ${media.medium`
    padding: 0 24px;
  `};

  ${media.small`
    padding: 0 16px;
  `};
`;

export const DetailBox = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100%;

  background-color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TodoNameBox = styled.div<{ $bgColor: string }>`
  width: 100%;
  max-width: 996px;
  height: 64px;
  border-radius: 24px;
  border: 2px solid ${palette.slate900};
  background-color: ${({ $bgColor }) => $bgColor};
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 16px;
  margin: 16px 0;
`;

export const TodoBtnSpan = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${palette.slate900};
  background-color: #fefce8;
  margin-left: 14px;
`;
export const DoneBtnSpan = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: transparent;
  background-image: url("/checked.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-left: 14px;
  color: #fff;
`;

export const TodoNameInput = styled.input`
  border: none;
  text-decoration: underline;
  background-color: transparent;
`;

export const TodoConBox = styled.div`
  width: 100%;
  max-width: 996px;

  display: flex;
  align-items: center;
  gap: 16px;

  ${media.medium`
    flex-direction: column; 
  `};
`;

export const TodoImgBox = styled.div`
  width: 100%;
  max-width: 384px;
  height: 311px;
  background-color: #f8fafc;
  border-radius: 24px;
  border: 2px dotted ${palette.slate300};

  position: relative;

  ${media.medium`
    max-width: 696px;
  `};
`;

export const TodoImgP = styled.p`
  width: 100%;
  position: absolute;

  top: 50%;
  transform: translateY(-50%);
  text-align: center;
`;

export const TodoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const TodoMemoBox = styled.div`
  width: 100%;
  max-width: 588px;
  height: 311px;
  background-image: url("/memo.png");

  display: flex;
  align-items: center;
  position: relative;

  ${media.medium`
    max-width: 696px;
  `};
`;

export const ImgAddBtn = styled.button<{ $bgImg: string }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  font-size: 48px;
  background-image: url(${({ $bgImg }) => $bgImg});

  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const TodoMemoP = styled.p`
  width: 100%;

  color: #92400e;
  font-size: 16px;
  font-weight: 800;
  line-height: 18.16px;

  position: absolute;
  top: 24px;
  text-align: center;
`;

export const TodoMemoText = styled.textarea`
  width: 100%;

  border: none;
  resize: none;
  background-color: transparent;
  height: 80%;

  position: absolute;
  top: 50px;
  text-align: center;
`;

export const TodoBtnBox = styled.div`
  width: 100%;
  max-width: 996px;
  text-align: right;
  margin: 16px 0;

  ${media.medium`
    text-align: center;
  `};

  ${media.small`
    display: flex;
    justify-content: space-between;
  `};
`;

export const TodoAddBtn = styled.button<{ $bgColor: string }>`
  width: 100%;
  max-width: 168px;
  height: 56px;
  background-color: ${({ $bgColor }) => $bgColor};
  border: 2px solid #0f172a;
  border-radius: 24px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 1);
  margin-right: 12px;

  font-size: 16px;
  font-weight: 700;
  line-height: 18.16px;
  text-align: center;

  ${media.medium`
    margin-right: 8px;

  `};

  ${media.small`
    margin-right: 0;
  `};
`;

export const TodoDelBtn = styled.button`
  width: 100%;
  max-width: 168px;
  height: 56px;
  border: 2px solid #0f172a;
  border-radius: 24px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 1);
  background-color: ${palette.rose};
  color: #fff;

  font-size: 16px;
  font-weight: 700;
  line-height: 18.16px;
  text-align: center;
`;
