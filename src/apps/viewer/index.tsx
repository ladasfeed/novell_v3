import { NodeCompiled, CompiledNovellType } from "@/compiledTypes";
import { useEffect, useState } from "react";
import s from "./styles.module.scss";
import { useViewerState } from "../editor/zustand-store/useViewer";

type PropsType = {
  novell: CompiledNovellType;
};

export const ChapterViewer = ({ novell }: PropsType) => {
  const [currentChapter, setCurrentChapter] = useState<{
    nodes: NodeCompiled[];
  }>(novell.chapters[0]);
  const [currentNode, setCurrentNode] = useState<NodeCompiled>();
  const { setIsViewerVisible } = useViewerState();

  const onSceneNodeClick = () => {
    setCurrentNode(
      currentChapter.nodes.find((n) => currentNode?.next === n.id)
    );
  };

  useEffect(() => {
    setCurrentNode(() => {
      return currentChapter.nodes.find((node) => node.isRoot)!;
    });
  }, []);

  const close = () => {
    setIsViewerVisible(false, {});
  };

  const chooseOption = (item: any) => {
    setCurrentNode(currentChapter.nodes.find((n) => n.id == item.next));
  };

  if (!currentNode) return null;

  return (
    <div
      className={s.container}
      style={{ background: `url(${currentNode.background})` }}
    >
      <div className={s.content}>
        <div onClick={close}>Close</div>
        {currentNode.type === "action" && (
          <div className={s.action}>
            <div>{currentNode.id}</div>
            {currentNode.options.map((item) => (
              <div onClick={() => chooseOption(item)}>{item.text}</div>
            ))}
          </div>
        )}
        {currentNode.type === "basic" && (
          <div className={s.basicNext} onClick={onSceneNodeClick}>
            Next {currentNode.id}
          </div>
        )}
        <div className={s.textArea}>
          <div>{currentNode.id}</div>
        </div>
      </div>
    </div>
  );
};
