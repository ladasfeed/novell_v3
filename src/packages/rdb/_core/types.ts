import { EntityManager } from "./entityManager";

export type EntityBaseType<
    T extends { [key: string]: any } = { [key: string]: any }
> = {
    id: string;
    order: number;
    hover: boolean
} & T;

export type GenericOfEntityManager<T> = T extends EntityManager<infer X> ? X : never;

export type RemoveEntityBaseType<T extends Record<string, any>> = Omit<T, 'id' | 'order' | 'hover'>

export type SchemeType<EntityType, OptionalFields extends keyof EntityType> = {
    defaultValue: Pick<EntityType, OptionalFields>,
    relations?: {
        [key: string]: 'array' | 'single'
    }
}

export type EntityChangeGenericEventType = {
    type: string;
    entity: any;
};
