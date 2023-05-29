import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import axios from "axios";
export type TimeBlockDate = {
  blocks: any;
};

function Chart(blocks: any) {
  const [tags, setTags] = useState([]);
  const [data, setData] = useState<
    {
      id: string;
      title: string;
      class: string;
      path: string;
      value: number;
      color: string;
    }[]
  >([]);
  useEffect(() => {
    axios
      .get("/api/tag")
      .then((res) => {
        setTags(res.data.tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let prep = tags.map((tag: any) => {
      return {
        id: tag._id,
        title: tag.title,
        class: tag.iconClass,
        path: tag.iconPath,
        value: 0,
        color: tag.bgColor,
      };
    });

    let sum = 0;
    blocks.blocks.forEach((block: any) => {
      block.tags.forEach((blockTag: any) => {
        prep.forEach((tag: any) => {
          if (blockTag._id === tag.id) {
            sum +=
              new Date(block.end).getTime() - new Date(block.start).getTime();
            tag.value +=
              new Date(block.end).getTime() - new Date(block.start).getTime();
          }
        });
      });
    });
    prep = prep.filter((tag: any) => tag.value != 0);
    prep.map((tag: any) => {
      tag.value = (tag.value / sum) * 360;
    });
    setData(prep);
  }, [blocks.blocks]);
  return (
    <PieChart
      animate={true}
      animationDuration={300}
      data={data}
      label={({ x, y, dx, dy, dataEntry }) => {
        return (
          <svg
            x={x + dx - 5}
            y={y + dy - 5}
            dx={dx}
            dy={dy}
            xmlns="http://www.w3.org/2000/svg"
            width="10%"
            height="10%"
            fill="currentColor"
            className={`${dataEntry.class} bi`}
            viewBox="0 0 16 16"
          >
            <path d={dataEntry.path} />
          </svg>
        );
      }}
      labelPosition={60}
      labelStyle={{
        fontSize: ".2rem",
        fill: "#212529",
      }}
    />
  );
}
export default Chart;
