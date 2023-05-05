import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Menu from "@/components/Menu/Menu";
import Chart from "@/components/Chart/Chart";

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
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <Chart />
            </div>
            <div className="col-sm-6 col-xs-12"></div>
          </div>
        </div>
      </main>
    </>
  );
}
