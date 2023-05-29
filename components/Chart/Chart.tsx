import { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import axios from "axios";
import { JsxElement } from "typescript";
export type TimeBlockDate = {
  blocks: any;
};

function Chart(blocks: any) {
  const [tags, setTags] = useState([]);
  const [data, setData] = useState<
    { id: string; title: string; value: number; color: string }[]
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
    // console.log(tags);
    let prep = tags.map((tag: any) => {
      return {
        title: tag.title,
        id: tag._id,
        // title: tag.iconPath,
        // class: tag.iconClass,
        // path: tag.iconPath,
        value: 0,
        color: tag.bgColor,
      };
    });

    let sum = 0;
    // console.log(blocks.blocks);
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
      label={(data) => data.dataEntry.title}
      // label={(data) => {
      //   return (
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       width="16"
      //       height="16"
      //       fill="currentColor"
      //       className={`bi-bookmark-fill bi`}
      //       viewBox="0 0 16 16"
      //     >
      //       <path d={data.dataEntry.title} />
      //     </svg>
      //   );
      // }}
      labelPosition={50}
      labelStyle={{
        fontSize: ".8rem",
        fill: "#212529",
      }}
    />
  );
}
export default Chart;
