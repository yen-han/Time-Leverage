import Menu from "@/components/Menu/Menu";
import { tag } from "@/components/Tag/Tag";
import Tag from "@/components/Tag/Tag";
import EditTag from "@/components/EditTag/EditTag";
import styles from "./tags.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Tags() {
  const [tags, setTags] = useState<tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<{}>();
  const [label, setLabel] = useState<string>("new");
  useEffect(() => {
    axios
      .get("/api/tag")
      .then((res) => {
        setTags(res.data.tags);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tags]);

  function CallBack(info: any) {
    setSelectedTag(info);
    setLabel("edit");
    return;
  }

  return (
    <>
      <div className={`${styles.Tags} bg-warning bg-opacity-10`}>
        <Menu />
        <div className="container mt-5 px-5 px-sm-2">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <h1 className="mb-4">Tags</h1>
              {tags.map((tag, index) => (
                <Tag key={index} tag={tag} handleCallBack={CallBack} />
              ))}
            </div>
            <div className={`col-sm-6 col-xs-12`}>
              <EditTag type={label} props={selectedTag} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
