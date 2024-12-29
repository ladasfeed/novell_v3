import { useEffect } from "react";
import { useActiveNode } from "../../../../zustand-store/useActiveNode";
import s from "./styles.module.scss";
import { GeneralGUI } from "../../GUIElements/generalGUI";
import { NodeMetaGUI } from "../../GUIElements/NodeGUI";
import { TabsSwitcher } from "../../../../../../shared/components/TabsSwitcher";

type LeftSidebarTabsType = "assets" | "characters" | "background" | "audio";

const TABS = [
  {
    name: "General",
    component: NodeMetaGUI,
  },
  {
    name: "Assets",
    component: NodeMetaGUI,
  },
];

export const LeftSidebar = () => {
  const { activeNodeId } = useActiveNode();

  return (
    <div className={s.container}>
      {!activeNodeId && <GeneralGUI />}
      {activeNodeId && <NodeMetaGUI key={activeNodeId} />}
      {/* {activeNodeId && (
        <TabsSwitcher defaultActive={TABS[0].name} tabs={TABS}></TabsSwitcher>
      )} */}
    </div>
  );
};
