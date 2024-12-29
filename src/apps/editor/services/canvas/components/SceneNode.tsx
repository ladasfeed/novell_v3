import { Rect } from "react-konva";
import { BasicNode } from "./BaseNode";
import {
  BaseNodeType,
  NodeEntityManager,
} from "@/apps/editor/rdb-store/entities/nodes";
import { useEntity } from "@/packages/rdb";

export const ActNode = ({ id }: { id: string }) => {
  const entity = useEntity(NodeEntityManager, id) as BaseNodeType;

  return <BasicNode hideCreatePortButton entity={entity}></BasicNode>;
};
