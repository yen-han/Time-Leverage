import styles from "./tag.module.scss";
import axios from "axios";

export type tag = {
  _id: string;
  userId: string;
  title: string;
  fontColor: string;
  bgColor: string;
  iconClass: string;
  iconPath: string;
};
function Tag(tag: any) {
  function trashTag(id: string) {
    axios.delete(`/api/tag/${id}`).then((res) => {
      console.log(res);
    });
  }
  function modifyTag(data: any) {
    return tag.handleCallBack(data);
  }

  return (
    <div
      className={`${styles.tag}`}
      style={{ backgroundColor: tag.tag.bgColor, color: tag.tag.fontColor }}
    >
      <p className={`${styles.tagName}`}>
        <span className={`${styles.tagIcon}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`${tag.tag.iconClass} bi`}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d={tag.tag.iconPath} />
          </svg>
        </span>
        {tag.tag.title}
      </p>

      <div className={`${styles.buttonGroup}`}>
        <button
          type="button"
          className={`${styles.customButton} btn btn-light`}
          onClick={(e) => modifyTag(tag)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
          </svg>
        </button>
        <button
          type="button"
          className={`${styles.customButton} btn btn-light`}
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          id={tag.tag._id}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </button>
      </div>
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure to delete {tag.tag.title} Tag?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={(e) => trashTag(tag.tag._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Tag;
