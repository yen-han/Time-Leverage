import { PieChart } from "react-minimal-pie-chart";
function Chart() {
  return (
    <PieChart
      animate={true}
      animationDuration={300}
      data={[
        { title: "One", value: 10, color: "#E38627" },
        { title: "Two", value: 15, color: "#C13C37" },
        { title: "Three", value: 20, color: "#6A2135" },
      ]}
      label={(data) => data.dataEntry.title}
      labelPosition={50}
      labelStyle={{
        fontSize: ".8rem",
        fill: "#fff",
      }}
    />
  );
}
export default Chart;
