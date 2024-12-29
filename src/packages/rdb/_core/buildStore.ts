import { EntityManager } from "./entityManager"

export const buildStore = <T extends Record<string, EntityManager<any>>>(store: T) => {
    const getSnapshot = () => {
        return Object.entries(store).reduce((acc, [key, entityStore]) => {
            acc[key] = entityStore.entities

            return acc
        }, {} as any)
    }

    const persist = (v: Record<string, Array<any>>) => {
        Object.entries(v).forEach(([key, state]) => {
            if (store[key]) {
                store[key].setEntities(state)
            }
        })
    }

    return {
        store,
        getSnapshot,
        persist,
    }
}