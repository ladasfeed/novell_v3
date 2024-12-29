import { ReactNode } from "react";
import s from "./styles.module.scss";

type PropsType = {
  children: ReactNode;
  htmlFor?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ children, htmlFor, ...props }: PropsType) => {
  if (htmlFor)
    return (
      <button {...props} className={s.container}>
        <label className={s.label} htmlFor={htmlFor}></label>
        {children}
      </button>
    );

  return (
    <button {...props} className={s.container}>
      {children}
    </button>
  );
};
