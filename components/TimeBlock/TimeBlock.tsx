import { tag } from "@/components/Tag/Tag";
import axios from "axios";
export type timeBlock = {
  _id: string;
  start: Date;
  end: Date;
  title: string;
  desc: string;
  tags: tag[];
};
function TimeBlock(timeBlock: any) {
  const [startTime, endTime] = [
    new Date(timeBlock.timeBlock.start),
    new Date(timeBlock.timeBlock.end),
  ];
  function calculateTime() {
    let time = endTime.getTime() - startTime.getTime();
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time - hours * 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  }
  function trashBlock(id: string) {
    axios.delete(`/api/timeBlock/${id}`).then((res) => {
      console.log(res);
    });
  }
  return (
    <div
      className="card"
      style={{ marginBottom: "1rem", position: "relative" }}
    >
      <div className="card-body">
        <h6 className="card-subtitle mb-1 text-body-secondary">
          Duration: {calculateTime()}
        </h6>
        <p className="mb-2 text-body-tertiary">
          {startTime.getHours()}:
          {startTime.getMinutes() < 10
            ? `0${startTime.getMinutes()}`
            : startTime.getMinutes()}
          ~{endTime.getHours()}:
          {endTime.getMinutes() < 10
            ? `0${endTime.getMinutes()}`
            : endTime.getMinutes()}
        </p>
        <h5 className="card-title">{timeBlock.timeBlock.title}</h5>
        <p className="card-text">{timeBlock.timeBlock.desc}</p>
        <div>
          {timeBlock.timeBlock.tags.map((tag: tag, index: number) => {
            return (
              <button
                type="button"
                key={index}
                className={`btn`}
                style={{ backgroundColor: tag.bgColor, cursor: "default" }}
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
        <div style={{ position: "absolute", right: " 1rem", top: "1rem" }}>
          <button
            type="button"
            className="btn btn-light"
            style={{ marginRight: "0.4rem" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={(e) => trashBlock(timeBlock.timeBlock._id)}
            id={timeBlock.timeBlock._id}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default TimeBlock;
