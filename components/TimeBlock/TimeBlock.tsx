import { tag } from "@/components/Tag/Tag";
export type timeBlock = {
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
  // console.log(timeBlock.timeBlock);
  return (
    <div className="card" style={{ marginBottom: "1rem" }}>
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
        <div style={{ marginBottom: "1rem" }}>
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
        <a className="btn btn-primary" href="#" role="button">
          Edit
        </a>
      </div>
    </div>
  );
}
export default TimeBlock;
