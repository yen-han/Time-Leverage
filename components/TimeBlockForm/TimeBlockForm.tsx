import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./TimeBlockForm.module.scss";
import axios from "axios";
import { tag } from "@/components/Tag/Tag";

export type TimeBlockDate = {
  type: string;
  block: any;
  incomingDate: Date;
};

function TimeBlockForm({ type, block, incomingDate }: any) {
  const [date, setDate] = useState(incomingDate);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [start, setStart] = useState(
    type == "edit" ? new Date(block.timeBlock.start) : date
  );
  const [end, setEnd] = useState(
    type == "edit" ? new Date(block.timeBlock.end) : date
  );
  const [toggle, setToggle] = useState(false);
  const [tagList, setTagList] = useState(new Set<tag>());
  const [allTags, setAllTags] = useState(Array<tag>);

  useEffect(() => {
    axios.get("/api/tag").then((res) => {
      setAllTags(res.data.tags);
    });
  }, []);
  useEffect(() => {
    setDate(incomingDate);
  }, [incomingDate]);

  useEffect(() => {
    setStart(type == "edit" ? new Date(block.timeBlock.start) : date);
    setEnd(type == "edit" ? new Date(block.timeBlock.end) : date);
    setTitle(type == "edit" ? block.timeBlock.title : "");
    setDesc(type == "edit" ? block.timeBlock.desc : "");
    type == "edit"
      ? setTagList(new Set(block.timeBlock.tags))
      : setTagList(new Set<tag>());
  }, [type, block]);

  useEffect(() => {
    if (end < start) {
      setEnd(start);
    }
  }, [start]);

  function recordTags(tag: tag) {
    if (tagList.size < 3) {
      setTagList((prev) => new Set(prev.add(tag)));
    }
  }
  function removeTag(tag: tag) {
    setTagList(
      (prev) => new Set(Array.from(prev).filter((x) => x._id != tag._id))
    );
  }
  useEffect(() => {
    if (tagList.size > 0) {
      let error = document.getElementById("tagError");
      error?.classList.remove("d-block");
      error?.classList.add("d-none");
    }
  }, [tagList]);

  function onSubmit(event: any) {
    event.preventDefault();
    let error = document.getElementById("tagError");
    if (tagList.size == 0) {
      error?.classList.remove("d-none");
      error?.classList.add("d-block");
    } else {
      const formData = new FormData(event.target);
      formData.set(
        "TimeBlockDate",
        new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate()
        ).toUTCString()
      );
      formData.set("TimeBlockStart", new Date(start).toUTCString());
      formData.set("TimeBlockEnd", new Date(end).toUTCString());
      formData.set("TimeBlockTags", JSON.stringify(Array.from(tagList)));
      let formDataObj = Object.fromEntries(formData.entries());

      if (type == "edit") {
        axios
          .put(`/api/timeBlock/${block.timeBlock._id}`, formDataObj)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios.post("/api/timeBlock", formDataObj).then((res) => {
          console.log(res);
          setTitle("");
          setDesc("");
          setStart(date);
          setEnd(date);
          setTagList(new Set());
          setToggle(false);
        });
      }
    }
  }

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="newTimeBlock">
            {date.getMonth() + 1 + "/" + date.getDate()}{" "}
            {type == "edit" ? "Edit" : "New"} Time Block
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setTagList(new Set());
              setToggle(false);
            }}
          ></button>
        </div>
        <div className="modal-body">
          <form
            className={`${styles.NewTimeBlockForm} row g-3`}
            id="NewTimeBlockForm"
            onSubmit={onSubmit}
          >
            <div className="col-12">
              <label htmlFor="TimeBlockTitle" className="form-label">
                Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="TimeBlockTitle"
                name="TimeBlockTitle"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="col-12">
              <label htmlFor="TimeBlockDesc" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="TimeBlockDesc"
                name="TimeBlockDesc"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="TimeBlockStart" className="form-label">
                Start
              </label>
              <DatePicker
                id="TimeBlockStart"
                name="TimeBlockStart"
                className={`${styles.timepicker}`}
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
              <label htmlFor="TimeBlockEnd" className="form-label">
                End
              </label>
              <DatePicker
                id="TimeBlockEnd"
                name="TimeBlockEnd"
                className={`${styles.timepicker}`}
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
              <label
                htmlFor="TimeBlockTags"
                className="form-label"
                onClick={() => setToggle(!toggle)}
              >
                Tag <span className="text-danger">*</span>
              </label>
              <div
                className={`${styles.addTag}`}
                onClick={() => setToggle(!toggle)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`${styles.addTagIcon} bi bi-plus-circle-fill`}
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
                {toggle ? (
                  <div className={`${styles.tagContainer}`}>
                    {allTags.map((tag, index) => {
                      return (
                        <button
                          type="button"
                          key={index}
                          className={`btn ${styles.singleTag}`}
                          style={{ backgroundColor: tag.bgColor }}
                          onClick={(e) => recordTags(tag)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className={`bi ${tag.iconClass}}`}
                            viewBox="0 0 16 16"
                            style={{ marginRight: "0.5rem" }}
                          >
                            <path d={tag.iconPath} />
                          </svg>
                          {tag.title}
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <span style={{ fontSize: "0.8rem", color: "#747474" }}>
                (Maximum 3 tags)
              </span>
              <div id="TimeBlockTags" style={{ paddingLeft: "0" }}>
                {tagList.size > 0
                  ? Array.from(tagList).map((tag, index) => {
                      return (
                        <button
                          type="button"
                          key={index}
                          className={`btn ${styles.singleTag}`}
                          style={{ backgroundColor: tag.bgColor }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className={`bi ${tag.iconClass}}`}
                            viewBox="0 0 16 16"
                            style={{ marginRight: "0.5rem" }}
                          >
                            <path d={tag.iconPath} />
                          </svg>
                          {tag.title}
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className={`bi bi-x-circle ${styles.removeTag}`}
                              viewBox="0 0 16 16"
                              onClick={() => removeTag(tag)}
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                          </span>
                        </button>
                      );
                    })
                  : null}
              </div>
              <div
                className="alert alert-danger d-flex align-items-center d-none"
                role="alert"
                id="tagError"
                style={{ marginTop: "0.5rem" }}
              >
                <div>Select at least 1 tag.</div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setTagList(new Set());
                  setToggle(false);
                }}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default TimeBlockForm;
