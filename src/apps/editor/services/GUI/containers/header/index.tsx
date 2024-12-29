import Select from "react-select";
import s from "./styles.module.css";
import { useChapterController } from "../../../../hooks/useChapterController";
import { useNovellState } from "../../../../../../shared/hooks/useNovellState";
import { ChapterType, NovellType } from "../../../../../../types";
import { Link, useNavigate } from "react-router-dom";
import { persistChapterFromRDB } from "../../../../../../lib/statePersistors";
import { compileChapter } from "@/apps/editor/lib/compileChapter";
import { chaptersRDB } from "@/apps/editor/rdb-store/modules/chapterModule";
import { useEntities } from "@/packages/rdb";
import { AssetEntityManager } from "@/apps/editor/rdb-store/entities/assets";
import { Button } from "@/shared/components/Button";
import { useViewerState } from "@/apps/editor/zustand-store/useViewer";

export const HeaderGUI = () => {
  const { currentNovell, saveNovell } = useNovellState();
  const navigate = useNavigate();
  const { chapters, chapterId, createNewChapter } = useChapterController();
  const { setIsViewerVisible } = useViewerState();

  const saveCurrentNovell = () => {
    if (!chapterId) return;

    console.log(AssetEntityManager.entities, "  AssetEntityManager.entities");
    saveNovell({
      ...(currentNovell as NovellType),
      assets: AssetEntityManager.entities,
      chapters: chapters.map((chapterIterable) => {
        if (chapterId === chapterIterable.id) {
          return persistChapterFromRDB(chapterId);
        }
        return chapterIterable;
      }),
    });
  };

  const compileChapterHandler = () => {
    const chapterCompiled = compileChapter(chaptersRDB.store);
    setIsViewerVisible(true, {
      novell: {
        chapters: [
          {
            nodes: chapterCompiled.nodes,
          },
        ],
      },
    });

    console.log(chapterCompiled, "chapterCompiled");
  };

  const changeChapterHandler = (v: ChapterType) => {
    navigate("/editor/" + currentNovell!.id + "/" + v.id);
  };

  const chaptersOptions =
    chapters?.map((i) => ({ value: i, label: i.id })) || [];

  return (
    <header className={s.container}>
      <div className={s.left_actions}>
        <Link to={"/"}>Go back</Link>
      </div>
      <div className={s.middle_actions}>
        <Select
          placeholder="Chapter id"
          value={chaptersOptions.find(
            (option) => option.value.id === chapterId
          )}
          onChange={(event) => event && changeChapterHandler(event?.value)}
          options={chaptersOptions}
        />
        <Button onClick={createNewChapter} className={s.create_new_chapter}>
          +
        </Button>
      </div>
      <div className={s.right_actions}>
        <Button onClick={compileChapterHandler}>Compile</Button>
        <Button onClick={saveCurrentNovell}>Save</Button>
      </div>
    </header>
  );
};
