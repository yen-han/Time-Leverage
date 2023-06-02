import Menu from "@/components/Menu/Menu";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./statistics.module.scss";
import Chart from "@/components/Chart/Chart";
import axios from "axios";
import { timeBlock } from "@/components/TimeBlock/TimeBlock";
export default function Statistics() {
  let now = new Date();
  const [startDate, setStartDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), now.getDate())
  );
  const [endDate, setEndDate] = useState(
    new Date(now.getFullYear(), now.getMonth(), now.getDate())
  );
  const [timeBlocks, setTimeBlocks] = useState(Array<timeBlock>);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  useEffect(() => {
    axios
      .get("/api/timeBlock", {
        params: {
          start: startDate,
          end: endDate,
        },
      })
      .then((res) => {
        setTimeBlocks(
          res.data.timeBlocks.sort((a: any, b: any) => {
            return new Date(a.start).getTime() - new Date(b.start).getTime();
          })
        );
      });
  }, [startDate, endDate]);
  return (
    <div>
      <Menu />
      <div className={`container mt-5 px-5 px-sm-2 ${styles.Statistics}`}>
        <div className="row">
          <div className="col-sm-5 col-xs-12 mb-5">
            <Chart blocks={timeBlocks} />
          </div>
          <div className="col-sm-1 col-xs-12"></div>
          <div className={`col-sm-6 col-xs-12`}>
            <DatePicker
              className={`${styles.DatePicker}`}
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
            />
          </div>
        </div>
      </div>
    </div>
  );
}
