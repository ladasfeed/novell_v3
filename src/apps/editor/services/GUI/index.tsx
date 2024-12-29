import { HeaderGUI } from "./containers/header";
import { LeftSidebar } from "./containers/leftSidebar";
import { RightSidebar } from "./containers/rightSidebar";
import s from "./styles.module.scss";

export const GUI = () => {
  return (
    <div className={s.container}>
      <HeaderGUI />
      <LeftSidebar />
      <RightSidebar />
    </div>
  );
};
