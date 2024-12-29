import { Link } from "react-router-dom";
import { NovellType } from "../../../../types";
import s from "./styles.module.scss";
import { STATIC_URL } from "@/configs/editorconfig";

type PropsType = {
  novell: NovellType;
};

export const NovellCard = ({ novell }: PropsType) => {
  return (
    <Link className={s.container} to={`/editor/${novell.id}`}>
      <img className={s.image} src={STATIC_URL + novell.image} />
      <div className={s.info}>
        <span>{novell.id}</span>
        <span className={s.title}>{novell.title}</span>
        <span className={s.date}></span>
      </div>
    </Link>
  );
};
