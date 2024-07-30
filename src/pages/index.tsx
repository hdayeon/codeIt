import Head from "next/head";
import { Inter } from "next/font/google";
import TodoHome from "@/components/TodoHome";
import Header from "@/components/Header";

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
