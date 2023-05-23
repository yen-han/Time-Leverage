export type Props = {
  data: {
    hour: number;
    minute: number;
  };
};
function TimeBlock({ data }: Props) {
  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-body-secondary">
          Remaining: {data.hour}h {data.minute}m
        </h6>
      </div>
    </div>
  );
}
export default TimeBlock;
