import { tag } from "@/components/Tag/Tag";
export type Props = {
  data: {
    start: Date;
    end: Date;
    title: string;
    description: string;
    tags: tag[];
  };
};
function TimeBlock({ data }: Props) {
  function calculateTime() {
    let time = new Date(data.end).getTime() - new Date(data.start).getTime();
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time - hours * 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  }
  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {calculateTime()}
        </h6>
        <h5 className="card-title">{data.title}</h5>
        <p className="card-text">{data.description}</p>
        <div style={{ marginBottom: "1rem" }}>
          {data.tags.map((tag, index) => {
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
