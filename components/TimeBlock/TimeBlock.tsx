import { tag } from "@/components/Tag/Tag";
export type timeBlock = {
  start: Date;
  end: Date;
  title: string;
  desc: string;
  tags: tag[];
};
function TimeBlock(timeBlock: any) {
  function calculateTime() {
    let time =
      new Date(timeBlock.timeBlock.end).getTime() -
      new Date(timeBlock.timeBlock.start).getTime();
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time - hours * 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  }
  // console.log(timeBlock.timeBlock);
  return (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {calculateTime()}
        </h6>
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
