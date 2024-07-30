"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as S from "../styles/detail";
import { TodoType } from "@/types/todo";
import { usePathname } from "next/navigation";

const Detail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  // const id = usePathname();
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

  return (
    <S.DetailLayout>
      {todo && (
        <>
          <S.TodoNameBox key={todo.id}>
            <S.TodoBtn></S.TodoBtn>
            <S.TodoSpan>{todo.name}</S.TodoSpan>
          </S.TodoNameBox>
        </>
      )}
    </S.DetailLayout>
  );
};

export default Detail;
