import React, { useState, useEffect, use } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Chart from "@/components/Chart/Chart";
import TimeBlock from "@/components/TimeBlock/TimeBlock";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeBlockForm from "@/components/TimeBlockForm/TimeBlockForm";
import axios from "axios";
import RemainingBlock from "@/components/RemainingBlock/RemainingBlock";
import { timeBlock } from "@/components/TimeBlock/TimeBlock";
import ProtectedRoute from "./ProtectedRoute";

export default function Home() {
  let now = new Date();
  const [type, setType] = useState("new");
  const [selectedBlock, setSelectedBlock] = useState({});
  const [selectDate, setSelectDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), now.getDate())
  );
  const [timeBlocks, setTimeBlocks] = useState(Array<timeBlock>);
  const [remaining, setRemaining] = useState({ hour: 24, minute: 0 });
  useEffect(() => {
    axios
      .get("/api/timeBlock", {
        params: {
          date: selectDate,
        },
      })
      .then((res) => {
        setTimeBlocks(
          res.data.timeBlocks.sort((a: any, b: any) => {
            return new Date(a.start).getTime() - new Date(b.start).getTime();
          })
        );
      });
    // Remaining block calculation
    let sum = 0;
    timeBlocks.forEach((block) => {
      sum += new Date(block.end).getTime() - new Date(block.start).getTime();
    });
    let left = 86400000 - sum;
    let hours = Math.floor(left / 3600000);
    let minutes = Math.floor((left - hours * 3600000) / 60000);
    setRemaining({ hour: hours, minute: minutes });
  }, [timeBlocks, selectDate]);

  function CallBack(timeBlock: any) {
    setSelectedBlock(timeBlock);
    setType("edit");
    return;
  }
  return (
    <>
      <Head>
        <title>Time Leverage</title>
        <meta name="description" content="Time tracking app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProtectedRoute>
        <main className={`${styles.Home}`}>
          <div className={`container mt-5 px-5 px-sm-2`}>
            <div className="row">
              <div className="col-sm-5 col-xs-12 mb-5">
                <Chart blocks={timeBlocks} />
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
                {timeBlocks.map((block, index) => (
                  <TimeBlock
                    timeBlock={block}
                    key={index}
                    handleCallBack={CallBack}
                  />
                ))}
                {!(remaining.hour == 0 && remaining.minute == 0) && (
                  <RemainingBlock data={remaining} />
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#TimeBlockModal"
                  style={{ marginTop: "1rem", marginBottom: "2rem" }}
                  onClick={() => {
                    setType("new");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={`bi bi-plus ${styles.newTimeIcon}`}
                    viewBox="0 0 16 16"
                    aria-hidden="true"
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
            <TimeBlockForm
              type={type}
              block={selectedBlock}
              incomingDate={selectDate}
            />
          </div>
        </main>
      </ProtectedRoute>
    </>
  );
}
