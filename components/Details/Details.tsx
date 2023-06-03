import axios from "axios";
import { useEffect, useState } from "react";
import { tag } from "@/components/Tag/Tag";
function Details(props: any) {
  const [tags, setTags] = useState<tag[]>([]);
  const [data, setData] = useState<
    {
      id: string;
      title: string;
      class: string;
      fontColor: string;
      bgColor: string;
      path: string;
      value: number;
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
    let prep = tags.map((tag: any) => {
      return {
        id: tag._id,
        title: tag.title,
        class: tag.iconClass,
        fontColor: tag.fontColor,
        bgColor: tag.bgColor,
        path: tag.iconPath,
        value: 0,
      };
    });
    props.blocks.forEach((block: any) => {
      block.tags.forEach((blockTag: any) => {
        prep.forEach((prepData: any) => {
          if (blockTag === prepData.id) {
            prepData.value +=
              new Date(block.end).getTime() - new Date(block.start).getTime();
          }
        });
      });
    });
    prep = prep.filter((tag: any) => tag.value != 0);
    prep.sort((a: any, b: any) => {
      return b.value - a.value;
    });
    setData(prep);
  }, [tags, props.blocks]);

  function calculateTime(time: number) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time - hours * 3600000) / 60000);
    return `${hours}h ${minutes < 10 ? `0${minutes}` : minutes}m`;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-3">Details</h5>
        <ul className="px-1">
          {data.map((element, index) => {
            return (
              <li
                className={"mb-2"}
                key={index}
                style={{
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button
                  type="button"
                  className={`btn`}
                  style={{
                    backgroundColor: element.bgColor,
                    cursor: "default",
                    marginRight: "0.4rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={`bi ${element.class}}`}
                    viewBox="0 0 16 16"
                    style={{ marginRight: "0.5rem" }}
                  >
                    <path d={element.path} />
                  </svg>
                  {element.title}
                </button>
                <span>{calculateTime(element.value)}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default Details;
