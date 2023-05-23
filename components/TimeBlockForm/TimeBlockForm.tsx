import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./TimeBlockForm.module.scss";
import IconPicker from "../IconPicker/IconPicker";

export type TimeBolckDate = {
  date: Date;
};

function TimeBlockForm({ date }: TimeBolckDate) {
  const [start, setStart] = useState(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
  );
  const [end, setEnd] = useState(
    new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
  );
  const [toggle, setToggle] = useState(false);
  const [icon, setIcon] = useState({
    class: "bi-emoji-smile-fill",
    path: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z",
  });

  useEffect(() => {
    setStart(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    );
    setEnd(start);
  }, [date]);

  useEffect(() => {
    if (end < start) {
      setEnd(start);
    }
    console.log(start);
  }, [start]);

  function CallBack(SelectedIcon: { class: string; path: string }) {
    return setIcon(SelectedIcon);
  }

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="newTimeBlock">
            {start.getMonth() + 1 + "/" + start.getDate()} New Time Block
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form className={`${styles.NewTimeBlockForm} row g-3`}>
            <div className="col-12">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Title
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="col-12">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Description
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Start
              </label>
              <DatePicker
                className={`${styles.timepicker} timepicker`}
                selected={start}
                onChange={(date) => {
                  if (date) setStart(date);
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                End
              </label>
              <DatePicker
                className={`${styles.timepicker} timepicker`}
                selected={end}
                onChange={(date) => {
                  console.log(date);
                  if (date) setEnd(date);
                }}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
            <div className="col-12">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Tag
              </label>
              <div
                className={`col-sm-3 my-3 mt-sm-1 ${styles.relative}`}
                onClick={() => setToggle(!toggle)}
              >
                <div className={`${styles.iconWrapper}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={`${styles.iconDefault} bi ${icon.class}}`}
                    viewBox="0 0 16 16"
                  >
                    <path d={icon.path} />
                  </svg>
                </div>
                {toggle ? (
                  <div className={`${styles.iconPickContainer}`}>
                    <IconPicker handleCallBack={CallBack} />
                  </div>
                ) : null}
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
export default TimeBlockForm;
