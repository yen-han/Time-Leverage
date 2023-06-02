import Menu from "@/components/Menu/Menu";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./statistics.module.scss";
export default function Statistics() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div>
      <Menu />
      <div className={`container mt-5 px-5 px-sm-2 ${styles.Statistics}`}>
        <div className="row">
          <div className="col-sm-5 col-xs-12 mb-5">
            {/* <Chart blocks={timeBlocks} /> */}
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
