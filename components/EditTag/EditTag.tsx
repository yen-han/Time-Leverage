import React, { useState } from "react";
import styles from "./editTag.module.scss";
import IconPicker from "@/components/IconPicker/IconPicker";
import axios from "axios";

function EditTag() {
  const [toggle, setToggle] = useState(false);
  const [color, setColor] = useState("#000000");
  const [icon, setIcon] = useState({
    class: "bi-emoji-smile-fill",
    path: "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z",
  });

  function onSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set("iconClass", icon.class);
    formData.set("iconPath", icon.path);
    let formDataObj = Object.fromEntries(formData.entries());
    axios
      .post("/api/tag", formDataObj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function CallBack(SelectedIcon: { class: string; path: string }) {
    return setIcon(SelectedIcon);
  }

  return (
    <form className={`${styles.editTag} needs-validation`} onSubmit={onSubmit}>
      <h2 className={`mb-4`}>EDIT TAG</h2>
      <div className="row mb-4 has-validation">
        <label htmlFor="tagName" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="tagFeedback"
            required
          />
          <div id="tagFeedback" className="invalid-feedback">
            Please enter tag name.
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="tagIcon" className="col-sm-3 col-form-label">
          Icon
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

        <label htmlFor="tagColor" className="col-sm-3 col-form-label">
          Color
        </label>
        <div className={`col-sm-3 my-1 mt-sm-1 ${styles.relative}`}>
          <input
            className={`${styles.colorPick}`}
            type="color"
            id="bgColor"
            name="bgColor"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-4"
        style={{ display: "flex", margin: "auto" }}
      >
        Submit
      </button>
    </form>
  );
}
export default EditTag;
