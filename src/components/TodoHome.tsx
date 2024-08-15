"use client";
import React, { useEffect, useState } from "react";
import * as S from "../styles/home";
import TodoIcon from "../../public/todo.svg";
import DoneIcon from "../../public/done.svg";
import TodoEmpLIcon from "../../public/emptyTodoL.svg";
import TodoEmpSIcon from "../../public/emptyTodoS.svg";
import DoneEmpLIcon from "../../public/emptyDoneL.svg";
import DoneEmpSIcon from "../../public/emptyDoneS.svg";
import { TodoType } from "@/types/todo";
import Link from "next/link";

const TodoHome: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const fetchTodos = async (page : number, pageSize : number) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/items?page=${page}&pageSize=${pageSize}`
      );
      const todos = await res.json();
      setTodos(todos);
    };

    fetchTodos(1,10); // 변수로 변경예정
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
        {todos.length > 0 ? (
          <S.AddBtn onClick={addTodoHandler}></S.AddBtn>
        ) : (
          <S.AddActBtn onClick={addTodoHandler}></S.AddActBtn>
        )}
      </S.HomeInputRow>

      {/* 미완료 todo */}
      <S.TodoListRow>
        <S.TodoListSection>
          <TodoIcon />
          <S.TodoList>
            {todos.filter((item) => !item.isCompleted).length > 0 ? (
              todos
                ?.filter((item) => !item.isCompleted)
                .map((item) => (
                  <S.TodoListItem key={item.id}>
                    <S.TodoBtn
                      onClick={() => toggleTodoDone(item.id)}
                    ></S.TodoBtn>

                    <Link
                      href={`/${item.id}`}
                      style={{ textDecoration: "none", color: "#1E293B" }}
                    >
                      <S.TodoSpan>{item.name}</S.TodoSpan>
                    </Link>
                  </S.TodoListItem>
                ))
            ) : (
              <>
                <S.EmpLP>
                  <TodoEmpLIcon />
                </S.EmpLP>
                <S.EmpSP>
                  <TodoEmpSIcon />
                </S.EmpSP>
                <S.EmpP>
                  할 일이 없어요.
                  <br />
                  TODO를 새롭게 추가해주세요!
                </S.EmpP>
              </>
            )}
          </S.TodoList>
        </S.TodoListSection>

        {/* 완료 todo */}
        <S.DoneListSection>
          <DoneIcon />
          <S.DoneList>
            {todos.filter((item) => item.isCompleted).length > 0 ? (
              todos
                ?.filter((item) => item.isCompleted)
                .map((item) => (
                  <S.DoneListItem key={item.id}>
                    <S.DoneBtn onClick={() => toggleTodoDone(item.id)}>
                      ⋁
                    </S.DoneBtn>

                    <Link
                      href={`/${item.id}`}
                      style={{ textDecoration: "none", color: "#1E293B" }}
                    >
                      <S.DoneSpan>{item.name}</S.DoneSpan>
                    </Link>
                  </S.DoneListItem>
                ))
            ) : (
              <>
                <S.EmpLP>
                  <DoneEmpLIcon />
                </S.EmpLP>
                <S.EmpSP>
                  <DoneEmpSIcon />
                </S.EmpSP>
                <S.EmpP>
                  아직 다 한 일이 없어요.
                  <br />
                  해야 할 일을 체크해보세요!
                </S.EmpP>
              </>
            )}
          </S.DoneList>
        </S.DoneListSection>
      </S.TodoListRow>
    </S.HomeLayout>
  );
};

export default TodoHome;
