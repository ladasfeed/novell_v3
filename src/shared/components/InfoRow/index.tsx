import { ChildrenPropsType } from "@/types";
import { HTMLAttributes } from "react";
import s from "./styles.module.scss";
import cn from "classnames";

type PropsType = {
  text: string;
} & HTMLAttributes<HTMLDivElement> &
  ChildrenPropsType;

export const InfoRow = ({ children, text, ...props }: PropsType) => {
  return (
    <div {...props} className={cn(s.container, props.className)}>
      <div className={s.text}>{text}</div>
      {children}
    </div>
  );
};
