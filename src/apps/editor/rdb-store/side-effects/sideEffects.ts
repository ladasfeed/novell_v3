import { NodeEntityManager } from "../entities/nodes";
import { useActiveNode } from "../../zustand-store/useActiveNode";


export const initSideEffects = () => {
    useActiveNode.subscribe(
        (state, prevState) => {
            if (prevState.activeNodeId) {
                NodeEntityManager.editEntity(prevState.activeNodeId, (node) => ({
                    ...node,
                    isActive: false
                }))
            }
            if (state.activeNodeId) {
                NodeEntityManager.editEntity(state.activeNodeId, (node) => ({
                    ...node,
                    isActive: true
                }))
            }
        },
    )
}