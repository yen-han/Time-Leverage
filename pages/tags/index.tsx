import Menu from "@/components/Menu/Menu";
import Tag from "@/components/Tag/Tag";
import styles from "./tags.module.scss";
export default function Tags() {
  return (
    <>
      <div className={`${styles.Tags} bg-warning bg-opacity-10`}>
        <Menu />
        <div className="container mt-5 px-5 px-sm-2">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <h1 className="mb-4">Tags</h1>
              <Tag />
            </div>
            <div className={`col-sm-6 col-xs-12`}></div>
          </div>
        </div>
      </div>
    </>
  );
}
