import { Group, Rect, Text } from "react-konva";
import { BasicNode } from "../components/BaseNode";
import { useEntity } from "@/packages/rdb";
import {
  BaseNodeType,
  NodeEntityManager,
} from "@/apps/editor/rdb-store/entities/nodes";

export const ActionNode = ({ id }: { id: string }) => {
  const entity = useEntity(NodeEntityManager, id) as BaseNodeType;

  return (
    <BasicNode entity={entity}>
      <Group>
        <Group></Group>
      </Group>
    </BasicNode>
  );
};
