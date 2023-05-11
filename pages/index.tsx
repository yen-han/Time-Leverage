import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Menu from "@/components/Menu/Menu";
import Chart from "@/components/Chart/Chart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [selectDate, setSelectDate] = useState(new Date());
  return (
    <>
      <Head>
        <title>Time Leverage</title>
        <meta name="description" content="Time tracking app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.Home} bg-warning bg-opacity-10`}>
        <Menu />
        <div className="container mt-5 px-5">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <Chart />
            </div>
            <div className={`col-sm-6 col-xs-12`}>
              <DatePicker
                className={`${styles.datepicker}`}
                selected={selectDate}
                onChange={(date) => {
                  if (date) setSelectDate(date);
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
