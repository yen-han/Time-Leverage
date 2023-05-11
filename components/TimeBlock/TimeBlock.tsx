export type Props = {
  data: {
    start: Date;
    end: Date;
    title: string;
    description: string;
  };
};
function TimeBlock({ data }: Props) {
  function calculateTime() {
    let time = data.end.getTime() - data.start.getTime();
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
        {/* TBD: Tags */}
        <p className="card-text">{data.description}</p>
        <a className="btn btn-primary" href="#" role="button">
          Edit
        </a>
      </div>
    </div>
  );
}
export default TimeBlock;
