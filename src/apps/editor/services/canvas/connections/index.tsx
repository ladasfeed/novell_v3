import { Layer } from "react-konva";
import { useCanvasContext } from "../chapterCanvasProvider";
import { useEffect, useRef } from "react";
import { Layer as LayerType } from "konva/lib/Layer";
import {
  ConnectionEntityManager,
  ConnectionType,
} from "../../../rdb-store/entities/connections";
import Konva from "konva";
import {
  getPortConnectionPos,
  getTargetConnectionPos,
} from "../../../../../lib/positions";
import { useEntities } from "../../../../../packages/rdb/_core/hooks";
import { chaptersRDB } from "../../../rdb-store/modules/chapterModule";
import { Node, NodeConfig } from "konva/lib/Node";
import { CanvasEvents, canvasEventsEmitter } from "../lib/canvasEvents";

type UIConnectionType = {
  portUi?: Node<NodeConfig>;
  sourceId: string;
  targetId: string;
  targetUi?: Node<NodeConfig>;
  uiObject: Konva.Line;
};

/* Trying to reduce amount of rerenders using a stage ref */
export const Connections = () => {
  const { stage } = useCanvasContext();
  const uiConnectionsRef = useRef<{
    [key: string]: UIConnectionType;
  }>({});
  const layerRef = useRef<null | LayerType>(null);
  const connections = useEntities(ConnectionEntityManager);

  const drawConnections = (touchedNodeId?: string) => {
    let connectionList = Object.values(uiConnectionsRef.current);

    if (touchedNodeId) {
      connectionList = connectionList.filter((c) => {
        return c.sourceId == touchedNodeId || c.targetId == touchedNodeId;
      });
    }

    connectionList.forEach((c: any) => {
      const sourceNodePos = c.portUi.getAbsolutePosition();
      const targetNodePos = c.targetUi.getAbsolutePosition();

      const sourcePos = getPortConnectionPos({
        x: (sourceNodePos.x - stage.x()) / stage.scaleX(),
        y: (sourceNodePos.y - stage.y()) / stage.scaleX(),
      });

      const targetPos = getTargetConnectionPos({
        x: (targetNodePos.x - stage.x()) / stage.scaleX(),
        y: (targetNodePos.y - stage.y()) / stage.scaleX(),
      });

      c.uiObject.points([
        sourcePos.x,
        sourcePos.y,
        sourcePos.x + Math.min((targetPos.x - sourcePos.x) / 10, 10),
        sourcePos.y + 50,
        targetPos.x,
        targetPos.y - 50,
        targetPos.x,
        targetPos.y,
      ]);
    });
  };

  const createInternalConnection = (connection: ConnectionType) => {
    return {
      portUi: stage.findOne(`#${connection.sourcePortId}`),
      sourceId: chaptersRDB.store.port.getEntity(connection.sourcePortId)
        ?.nodeId,
      targetId: connection.targetNodeId,
      targetUi: stage.findOne(`#${connection.targetNodeId}`),
      uiObject: new Konva.Line({
        points: [],
        name: "",
        stroke: "green",
        strokeWidth: 3,
        lineCap: "round",
        lineJoin: "round",
      }),
    };
  };

  useEffect(() => {
    connections.forEach((c) => {
      if (!uiConnectionsRef.current[c.id]) {
        uiConnectionsRef.current[c.id] = createInternalConnection(c);
        layerRef.current?.add(uiConnectionsRef.current[c.id].uiObject);
      }
    });

    const oldConnectionsIds = new Set(Object.keys(uiConnectionsRef.current));
    const newConnectionsIds = new Set(connections.map((c) => c.id));

    oldConnectionsIds.forEach((oldConnectionId) => {
      if (!newConnectionsIds.has(oldConnectionId)) {
        uiConnectionsRef.current[oldConnectionId].uiObject.destroy();
        delete uiConnectionsRef.current[oldConnectionId];
      }
    });

    drawConnections();
  }, [connections]);

  useEffect(() => {
    const cb = (e: Event & { detail: any }) => {
      drawConnections(e.detail?.target?.attrs?.id);
    };
    canvasEventsEmitter.addEventListener(
      CanvasEvents.MOVE_NOVE,
      cb as EventListener
    );

    return () => {
      canvasEventsEmitter.removeEventListener(
        CanvasEvents.MOVE_NOVE,
        cb as EventListener
      );
    };
  }, []);

  return <Layer id="ConnectionsLayer" ref={layerRef}></Layer>;
};
