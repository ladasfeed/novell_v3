import { useEntity } from "../../../../../../packages/rdb/_core/hooks";
import { NodeEntityManager } from "../../../../rdb-store/entities/nodes";
import { chaptersRDBEffects } from "../../../../rdb-store/modules/chapterModule";
import { useActiveNode } from "../../../../zustand-store/useActiveNode";
import s from "./styles.module.scss";
import { ActionNodeGUI } from "../ActionNodeGUI";
import { SceneNodeGUI } from "../SceneNodeGUI";
import { assetEffects } from "@/apps/editor/rdb-store/effects/assetEffects";
import { StaticApi } from "@/api/modules/staticApi";
import { novellEffects } from "@/apps/editor/rdb-store/modules/novellModule";

export const NodeMetaGUI = () => {
  const { activeNodeId } = useActiveNode();
  const nodeEntity = useEntity(NodeEntityManager, activeNodeId!)!;

  const addPortHandler = () => {
    chaptersRDBEffects.port.create(nodeEntity!.id);
  };

  const removePortHandler = (portId: string) => {
    chaptersRDBEffects.port.remove(portId);
  };

  const toggleRoot = () => {
    chaptersRDBEffects.baseNode.toggleRoot(nodeEntity.id);
  };

  const onChangeBackground: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (!event.target.files?.[0]) return;

    const res = await StaticApi.uploadFile(event.target.files[0]);
    const file = novellEffects.asset.create("image", res.filename);

    console.log(file, "file");
    chaptersRDBEffects.baseNode.addImageToBg(nodeEntity.id, file.id);
  };

  return (
    <div className={s.container}>
      <h2>{nodeEntity?.id}</h2>
      <div className={s.actions}>
        <div>
          Is root:{" "}
          <input
            type="checkbox"
            checked={nodeEntity.isRoot}
            onChange={toggleRoot}
          />
        </div>

        <div>
          <div>Change bg</div>
          <input type="file" onChange={onChangeBackground} />
        </div>

        {nodeEntity.type === "action" && <ActionNodeGUI entity={nodeEntity} />}
        {nodeEntity.type === "basic" && <SceneNodeGUI />}
      </div>
    </div>
  );
};
