import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Menu from "@/components/Menu/Menu";
import Chart from "@/components/Chart/Chart";
import TimeBlock from "@/components/TimeBlock/TimeBlock";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeBlockForm from "@/components/TimeBlockForm/TimeBlockForm";
import axios from "axios";

export default function Home() {
  let now = new Date();
  const [selectDate, setSelectDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), now.getDate())
  );
  let dummyData = {
    start: new Date(2017, 4, 4, 17, 23, 42, 11),
    end: new Date(2017, 4, 4, 19, 23, 42, 11),
    title: "Title",
    description: "Description",
  };
  useEffect(() => {
    axios
      .get("/api/timeBlock", {
        params: {
          date: selectDate,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, [selectDate]);

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
        <div className={`container mt-5 px-5 px-sm-2`}>
          <div className="row">
            <div className="col-sm-5 col-xs-12 mb-5">
              <Chart />
            </div>
            <div className="col-sm-1 col-xs-12"></div>
            <div className={`col-sm-6 col-xs-12`}>
              <DatePicker
                className={`${styles.datepicker}`}
                selected={selectDate}
                onChange={(date) => {
                  if (date) setSelectDate(date);
                }}
              />
              <TimeBlock data={dummyData} />
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#TimeBlockModal"
                style={{ marginTop: "1rem" }}
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-plus ${styles.newTimeIcon}`}
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                New Time Block
              </button>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="TimeBlockModal"
          tabIndex={-1}
          aria-labelledby="newTimeBlock"
          aria-hidden="true"
        >
          <TimeBlockForm date={selectDate} />
        </div>
      </main>
    </>
  );
}
