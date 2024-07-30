"use client";
import React, { useEffect, useState } from "react";
import * as S from "../styles/home";
import TodoIcon from "../../public/todo.svg";
import DoneIcon from "../../public/done.svg";
import { TodoType } from "@/types/todo";
import Link from "next/link";

const TodoHome: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/items`
      );
      const todos = await res.json();
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  const addTodo = async (newTodo: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTodo }),
    });

    if (!res.ok) {
      throw new Error("todo 등록 에러");
    }

    const data = await res.json();
    return data;
  };

  const addTodoHandler = async () => {
    if (todo.trim() === "") return;

    try {
      const newTodo = await addTodo(todo);
      setTodos((prevTodos) =>
        Array.isArray(prevTodos) ? [...prevTodos, newTodo] : [newTodo]
      );
      setTodo("");
    } catch (error) {
      console.error("todo 추가 실패", error);
    }
  };

  const toggleTodoDone = async (id: number) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);

    try {
      const updatedTodo = updatedTodos.find((item) => item.id === id);
      if (updatedTodo) {
        await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/items/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isCompleted: updatedTodo.isCompleted }),
        });
      }
    } catch (error) {
      console.error("todo 완료 상태 변경 실패", error);
    }
  };

  return (
    <S.HomeLayout>
      <S.HomeInputRow>
        <S.TodoInput
          placeholder="할 일을 입력해주세요"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <S.AddBtn onClick={addTodoHandler}></S.AddBtn>
      </S.HomeInputRow>
      <S.TodoListRow>
        <S.TodoListSection>
          {/* <TodoIcon /> */}
          <S.TodoList>
            {todos
              ?.filter((item) => !item.isCompleted)
              .map((item) => (
                <S.TodoListItem key={item.id}>
                  <S.TodoBtn
                    onClick={() => toggleTodoDone(item.id)}
                  ></S.TodoBtn>

                  <Link href={`/${item.id}`} style={{ textDecoration: "none", color: "#1E293B"}}>
                    <S.TodoSpan>{item.name}</S.TodoSpan>
                  </Link>
                </S.TodoListItem>
              ))}
          </S.TodoList>
        </S.TodoListSection>
        <S.DoneListSection>
          {/* <DoneIcon /> */}
          <S.DoneList>
            {todos
              ?.filter((item) => item.isCompleted)
              .map((item) => (
                <S.DoneListItem key={item.id}>
                  <S.DoneBtn onClick={() => toggleTodoDone(item.id)}>
                    ⋁
                  </S.DoneBtn>
                  <S.DoneSpan>{item.name}</S.DoneSpan>
                </S.DoneListItem>
              ))}
          </S.DoneList>
        </S.DoneListSection>
      </S.TodoListRow>
    </S.HomeLayout>
  );
};

export default TodoHome;
