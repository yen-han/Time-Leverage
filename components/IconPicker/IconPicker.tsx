import { IconDict } from "@/data/IconDict";
import styles from "./IconPicker.module.scss";

function IconPicker(props: any) {
  return (
    <div>
      {IconDict.map((icon, index) => (
        <span key={index} className={`${styles.hover}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`${icon.class} bi ${styles.icon}`}
            viewBox="0 0 16 16"
            onClick={() => {
              props.handleCallBack(icon);
            }}
          >
            <path d={icon.path}></path>
          </svg>
        </span>
      ))}
    </div>
  );
}
export default IconPicker;
