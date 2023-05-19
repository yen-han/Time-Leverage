import Menu from "@/components/Menu/Menu";
import { tag } from "@/components/Tag/Tag";
import Tag from "@/components/Tag/Tag";
import EditTag from "@/components/EditTag/EditTag";
import styles from "./tags.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Tags() {
  const [tags, setTags] = useState<tag[]>([]);
  useEffect(() => {
    axios.get("/api/tags").then((res) => {
      setTags(res.data.tags);
      console.log(res.data.tags);
    });
  }, []);

  return (
    <>
      <div className={`${styles.Tags} bg-warning bg-opacity-10`}>
        <Menu />
        <div className="container mt-5 px-5 px-sm-2">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <h1 className="mb-4">Tags</h1>
              {tags.map((tag, index) => (
                <Tag key={index} props={tag} />
              ))}
            </div>
            <div className={`col-sm-6 col-xs-12`}>
              <EditTag />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
