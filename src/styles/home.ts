import styled from "styled-components";
import palette from "./palette";
import media from "./media";

export const HomeLayout = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  margin: 24px auto 0;
  color: ${palette.slate800};
`;

export const HomeInputRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 34px;
`;

export const TodoInput = styled.input`
  width: 100%;
  max-width: 968px;
  height: 56px;
  padding: 0 24px;
  border: 2px solid ${palette.slate900};
  border-radius: 24px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 1);
  outline: none;
  background-color: ${palette.slate100};
`;

export const AddBtn = styled.button`
  width: 168px;
  min-width: 162px;
  height: 56px;
  border: none;
  background-color: transparent;
  background-image: url("/addL.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  ${media.small`
    width: 56px;
    min-width: 56px;
    height: 56px;
    background-image: url("/addS.png");
  `};
`;

export const AddActBtn = styled.button`
  width: 168px;
  min-width: 162px;
  height: 56px;
  border: none;
  background-color: transparent;
  background-image: url("/addActL.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  ${media.small`
    width: 56px;
    min-width: 56px;
    height: 56px;
    background-image: url("/addActS.png");
  `};
`;

export const TodoListRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 32px;

  ${media.medium`
    flex-direction: column;
  `};
`;

export const TodoListSection = styled.section`
  width: 100%;
`;

export const DoneListSection = styled.section`
  width: 100%;
`;

export const TodoList = styled.ul`
  width: 100%;
  margin: 16px 0 0;
  text-align: center;
`;

export const DoneList = styled.ul`
  width: 100%;
  margin: 16px 0 0;
  text-align: center;
`;

export const TodoListItem = styled.li`
  width: 100%;
  max-width: 588px;
  height: 50px;
  border-radius: 27px;
  border: 2px solid ${palette.slate900};
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  text-align: left;
`;

export const DoneListItem = styled.li`
  width: 100%;
  max-width: 588px;
  height: 50px;
  border-radius: 27px;
  border: 2px solid ${palette.slate900};
  background-color: ${palette.violet100};
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  text-align: left;
`;

export const TodoBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${palette.slate900};
  background-color: #fefce8;
  margin-left: 14px;
`;

export const DoneBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${palette.violet600};
  background-color: ${palette.violet600};
  margin-left: 14px;
  color: #fff;
`;

export const TodoSpan = styled.span`
  width: 100%;
`;

export const DoneSpan = styled.span`
  width: 100%;
  text-decoration: line-through;
`;

export const EmpLP = styled.p`
  display: block;

  ${media.small`
    display: none;
  `};
`;
export const EmpSP = styled.p`
  display: none;

  ${media.small`
    display: block;
  `};
`;

export const EmpP = styled.p`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  line-height: 18.16px;
  color: ${palette.slate400};
`;
