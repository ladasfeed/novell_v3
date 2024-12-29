import React, { useId, useEffect } from "react";
import { EntityManager } from "./entityManager";
import { GenericOfEntityManager } from "./types";

export const useEntity = <T extends EntityManager<any>, Entity extends GenericOfEntityManager<T>>(store: T, id: string | undefined): Entity | null => {
    const subscriberId = useId();
    const [entity, setEntity] = React.useState<any | null>(store.getEntity(id))


    useEffect(() => {
        if (!entity) {
            setEntity(store.getEntity(id))
        }

        if (!id) return;

        const unsubscribe = store.subscribe((newEntity) => {
            setEntity(newEntity)
        }, id, subscriberId)

        return unsubscribe
    }, [id])


    return entity
}


export const useEntities = <T extends EntityManager<any>, Entity extends GenericOfEntityManager<T>>(store: T): Entity[] => {
    const subscriberId = useId();
    const [entites, setEntities] = React.useState(store.getEntities('asArray') as Entity[]);

    useEffect(() => {
        const unsubscribe = store.subscribeToList(subscriberId, (newEntity) => {
            setEntities(newEntity)
        })

        return unsubscribe
    }, [])

    return entites
}