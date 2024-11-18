import { Pencil } from "lucide-react";
import styles from "./index.module.scss";

type Props = {
  img: string;
  name: string;
  level: number;
};

export const Character = ({ img, name, level }: Props) => {
  return (
    <div className={`${styles.character} mt-md`}>
      <img src={img} alt="Character" />
      <div className={`${styles.tag} typo-header3`}>
        {name}
        <div className="typo-body p-sm ml-sm">{`Lv.${level}`}</div>
        <Pencil className="ml-md" />
      </div>
    </div>
  );
};
