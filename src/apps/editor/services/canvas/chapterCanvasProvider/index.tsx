import { Stage } from "konva/lib/Stage";
import React, { ReactNode, useCallback, useState } from "react";

const KonvaStageProvider = React.createContext<{
  stage: Stage;
  setOnNodeDragMove: (cb: any) => void;
  onNodeDragMove: ((e: any) => void) | null;
}>({
  onNodeDragMove: null,
  setOnNodeDragMove: null as any,
  stage: null as unknown as Stage,
});

export const StageProvider = ({
  children,
  stage,
}: {
  children: ReactNode;
  stage: Stage;
}) => {
  const [onNodeDragMove, setOnNodeDragMove] = useState<null | (() => void)>(
    null
  );

  const handler = useCallback((v: (event: any) => void) => {
    setOnNodeDragMove(() => v);
  }, []);

  return (
    <KonvaStageProvider.Provider
      value={{
        stage,
        onNodeDragMove,
        setOnNodeDragMove: handler,
      }}
    >
      {children}
    </KonvaStageProvider.Provider>
  );
};

export const useCanvasContext = () => React.useContext(KonvaStageProvider);
