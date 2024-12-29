import { useViewerState } from "@/apps/editor/zustand-store/useViewer";
import { ChapterViewer } from "..";
import { CompiledNovellType } from "@/compiledTypes";

export const ViewerWrapper = () => {
  const { isViewerVisible, payload, setIsViewerVisible } = useViewerState();

  if (!isViewerVisible || !payload) {
    return null;
  }

  return <ChapterViewer novell={payload.novell as CompiledNovellType} />;
};
