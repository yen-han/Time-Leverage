import Menu from "@/components/Menu/Menu";
import Tag from "@/components/Tag/Tag";
import styles from "./tags.module.scss";

export default function Tags() {
  let dummyTags = [
    {
      id: 1,
      title: "Sleep",
      fontColor: "inherit",
      bgColor: "#faebd7",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-moon-fill"
          viewBox="0 0 16 16"
        >
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Sleep",
      fontColor: "#fff9e5",
      bgColor: "#27a567",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-moon-fill"
          viewBox="0 0 16 16"
        >
          <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className={`${styles.Tags} bg-warning bg-opacity-10`}>
        <Menu />
        <div className="container mt-5 px-5 px-sm-2">
          <div className="row">
            <div className="col-sm-6 col-xs-12">
              <h1 className="mb-4">Tags</h1>
              {dummyTags.map((tag, index) => (
                <Tag key={index} data={tag}></Tag>
              ))}
              {/* // <Tag /> */}
            </div>
            <div className={`col-sm-6 col-xs-12`}></div>
          </div>
        </div>
      </div>
    </>
  );
}
