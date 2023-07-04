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
      <div className={`${styles.Tags}`}>
        <div className="container mt-5 px-5 px-sm-2">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <h1 className="mb-4">Tags</h1>
              {tags.map((tag, index) => (
                <Tag key={index} tag={tag} handleCallBack={CallBack} />
              ))}
              <button
                type="button"
                className={`btn btn-primary ${styles.newTag}`}
                onClick={() => setLabel("new")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={`bi bi-plus ${styles.newTagIcon}`}
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                New Tag
              </button>
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
