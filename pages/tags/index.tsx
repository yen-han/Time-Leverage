import Menu from "@/components/Menu/Menu";
import styles from "./tags.module.scss";
export default function Tags() {
  return (
    <>
      <div className={`${styles.Tags} bg-warning bg-opacity-10`}>
        <Menu />
        <div className="container mt-5 px-5 px-sm-2">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <h1>Tags</h1>
            </div>
            <div className={`col-sm-6 col-xs-12`}></div>
          </div>
        </div>
      </div>
    </>
  );
}
