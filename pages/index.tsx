import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Menu from "@/components/Menu/Menu";

export default function Home() {
  return (
    <>
      <Head>
        <title>Time Leverage</title>
        <meta name="description" content="Time tracking app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} bg-warning bg-opacity-10`}>
        <Menu />
      </main>
    </>
  );
}
