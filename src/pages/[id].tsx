"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as S from "../styles/detail";
import { TodoType } from "@/types/todo";
import ImgIcon from "../../public/img.svg";

const Detail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<TodoType>();

  useEffect(() => {
    if (id) {
      const fetchTodo = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/items/${id}`
        );
        const data: TodoType = await response.json();
        setTodo(data);
      };
      fetchTodo();
    }
  }, [id]);

  const DeleteHandler = async () => {
    if (id) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/items/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          router.push("/");
          alert("삭제가 완료되었습니다.");
        } else {
          console.error("삭제 실패");
        }
      } catch (error) {
        console.error("삭제 오류", error);
      }
    }
  };

  return (
    <S.DetailLayout>
      {todo && (
        <S.DetailBox>
          <S.TodoNameBox key={todo.id}>
            <S.TodoBtnSpan></S.TodoBtnSpan>
            <S.TodoH2>{todo.name}</S.TodoH2>
          </S.TodoNameBox>

          <S.TodoConBox>
            <S.TodoImgBox>
              <S.TodoImgP>
                <ImgIcon />
              </S.TodoImgP>
              <S.ImgAddBtn>+</S.ImgAddBtn>
            </S.TodoImgBox>

            <S.TodoMemoBox>
              <S.TodoMemoP>Memo</S.TodoMemoP>
            </S.TodoMemoBox>
          </S.TodoConBox>

          <S.TodoBtnBox>
            <S.TodoAddBtn>⋁ 수정 완료</S.TodoAddBtn>
            <S.TodoDelBtn onClick={DeleteHandler}>X 삭제하기</S.TodoDelBtn>
          </S.TodoBtnBox>
        </S.DetailBox>
      )}
    </S.DetailLayout>
  );
};

export default Detail;
