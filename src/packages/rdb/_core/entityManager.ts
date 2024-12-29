import { EntityBaseType, EntityChangeGenericEventType } from "./types";

export class EntityManager<EntityType extends EntityBaseType> {
    public entities: {
        [key: string]: EntityType
    } = {};
    public innerIdIncrementor: number = 0;

    public subscribers: {
        [entityId: string]: {
            [callbackId: string]: (enitity: EntityType) => void
        }
    } = {};
    public listSubscribers: {
        [callbackId: string]: (entities: EntityType[]) => void
    } = {};
    public events: EntityChangeGenericEventType[] = [];
    public scheme?: Zod.ZodObject<any>;
    public eventsSubscriber?: (event: EntityChangeGenericEventType) => void;

    constructor(scheme: Zod.ZodObject<any>) {
        this.scheme = scheme;
    }

    public setEntities(entities: { [key: string]: EntityType }) {
        this.entities = entities

        this.subscribers = {};
        this.listSubscribers = {};
    }

    public getEntities<T extends ('asArray' | 'asObject')>(mode?: T): T extends 'asArray' ? EntityType[] : { [key: string]: EntityType; } {
        if (mode === 'asArray') {
            // @ts-ignore
            return Object.values(this.entities).sort((a, b) => a.order - b.order);
        }

        // @ts-ignore
        return this.entities
    }

    private addEvent(event: EntityChangeGenericEventType) {
        this.events.push(event);

        if (this.eventsSubscriber) {
            this.eventsSubscriber(event);
        }
    }

    public subscribeToList(subscriberId: string, cb: (entities: EntityType[]) => void) {
        this.listSubscribers[subscriberId] = cb;

        return () => {
            delete this.listSubscribers[subscriberId];
        }
    }

    public notifiyListSubscribers() {
        Object.values(this.listSubscribers).forEach((cb) => {
            cb(Object.values(this.entities).sort((a, b) => a.order - b.order))
        })
    }

    public addEntity(entity: Partial<EntityType>, options?: {
        silent?: boolean
    }) {
        const id = String(Math.floor(Math.random() * 10000));

        const newEntity = this.scheme?.parse(entity)

        this.entities[id] = {
            ...(entity as Omit<EntityType, 'id'>),
            ...newEntity,
            order: this.innerIdIncrementor++,
            id
        } as EntityType;
        this.subscribers[id] = {};

        if (!options?.silent) {
            this.notifiyListSubscribers();
        }

        this.addEvent({
            type: 'create',
            entity: this.entities[id]
        })

        return this.entities[id];
    }

    public removeEntity(id: string, options?: {
        silent?: boolean
    }) {
        delete this.entities[id];

        this.addEvent({
            type: 'delete',
            entity: { id }
        })

        if (!options?.silent) {
            this.notifiyListSubscribers();
        }
    }
    public subscribe(cb: (enitity: EntityType) => void, id: string, subscriberId: string) {
        if (!this.subscribers[id]) {
            this.subscribers[id] = {}
        }

        const cbId = subscriberId;
        this.subscribers[id][cbId] = cb;

        return () => {
            if (this.subscribers[id] && this.subscribers[id][cbId]) {
                delete this.subscribers[id][cbId];
            }
        }
    }

    public editEntity(id: string, enitityOrCallback: EntityType | ((entity: EntityType) => EntityType)) {
        const newEntity = typeof enitityOrCallback === 'function' ? enitityOrCallback(this.entities[id]) : enitityOrCallback;

        this.entities[id] = { ...newEntity };

        this.addEvent({
            type: 'edit',
            entity: this.entities[id]
        })

        Object.values(this.subscribers[id]).forEach(cb => {
            cb(this.entities[id])
        })

        return this.entities[id]
    }
    public getEntity(id?: string) {
        return this.entities[id || ''] || null;
    }
}

