"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as S from "../styles/detail";
import { TodoType } from "@/types/todo";
import ImgIcon from "../../public/img.svg";

const Detail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<TodoType>({
    id: 0,
    name: "",
    isCompleted: false,
    memo: "",
    imageUrl: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(todo.imageUrl || null);

  useEffect(() => {
    if (id) {
      const fetchTodo = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/items/${id}`
        );
        const data: TodoType = await response.json();
        setTodo(data);
        setPreview(data.imageUrl || null);
      };
      fetchTodo();
    }
  }, [id]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
  };

  const imagePreviewHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (
      file &&
      file.size <= 5 * 1024 * 1024 &&
      /^[a-zA-Z0-9_.-]*$/.test(file.name)
    ) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          // 업로드 이미지 미리보기
          setPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("이미지 파일은 5MB 이하, 영어 이름만 가능합니다.");
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/images/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      console.log("업로드 res", res);

      if (res) {
        const data = await res.json();
        return data.url;
      } else {
        console.error("이미지 업로드 실패");
        return null;
      }
    } catch (error) {
      console.error("이미지 업로드 오류", error);
      return null;
    }
  };

  const updateHandler = async () => {
    if (id) {
      let imageUrl: string = todo.imageUrl || "";

      if (image) {
        const uploadedImageUrl = await uploadImage(image);
        if (uploadedImageUrl) {
          imageUrl = uploadedImageUrl;
        }
      }

      const updatedTodo = {
        name: todo.name,
        memo: todo.memo || "",
        imageUrl: imageUrl || "",
        isCompleted: todo.isCompleted,
      };

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/items/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodo),
          }
        );
        if (res.ok) {
          router.push("/");
          alert("수정이 완료되었습니다.");
        } else {
          console.error("수정 실패");
        }
      } catch (error) {
        console.error("수정 오류", error);
      }
    }
  };

  const deleteHandler = async () => {
    if (id) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/items/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
            <S.TodoNameInput
              type="text"
              name="name"
              value={todo.name}
              onChange={inputChangeHandler}
            />
          </S.TodoNameBox>

          <S.TodoConBox>
            <S.TodoImgBox>
              <S.TodoImgP>
                {preview ? <img src={preview} alt="todo" /> : <ImgIcon />}
              </S.TodoImgP>

              <S.ImgAddBtn>
                <label htmlFor="fileUpload">+</label>
              </S.ImgAddBtn>

              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={imagePreviewHandler}
                style={{ display: "none" }}
              />
            </S.TodoImgBox>

            <S.TodoMemoBox>
              <S.TodoMemoP>Memo</S.TodoMemoP>
              <S.TodoMemoText
                name="memo"
                value={todo.memo || ""}
                onChange={inputChangeHandler}
              />
            </S.TodoMemoBox>
          </S.TodoConBox>

          <S.TodoBtnBox>
            <S.TodoAddBtn onClick={updateHandler}>⋁ 수정 완료</S.TodoAddBtn>
            <S.TodoDelBtn onClick={deleteHandler}>X 삭제하기</S.TodoDelBtn>
          </S.TodoBtnBox>
        </S.DetailBox>
      )}
    </S.DetailLayout>
  );
};

export default Detail;
