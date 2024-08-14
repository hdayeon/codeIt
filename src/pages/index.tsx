import Head from "next/head";
import { Inter } from "next/font/google";
import TodoHome from "@/components/TodoHome";
import Header from "@/components/Header";
import { GetServerSideProps } from "next";
import { TodoType } from "@/types/todo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>TODO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <TodoHome />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  initMemoryList: TodoType
}> = async () => {
  const getMemoryList = await fetch(
    `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/items/page?page=1&pageSize=${GET_PAGE_SIZE}}`
  )
  const getMemoryListRes: GetMemoryListRes = await getMemoryList.json()

  const initMemoryList: TodoType = {
    pageSize: getMemoryListRes.content,
    page: getMemoryListRes.pageable.page,
  }
  return { props: { initMemoryList } }
}

