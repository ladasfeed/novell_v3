import { useEffect } from "react";
import { EntityManager } from "./entityManager";

type PropsType = {
  stores: Array<{ [key: string]: EntityManager<any> }>;
};

export const EntityStoreDevTools = ({ stores }: PropsType) => {
  useEffect(() => {
    if (!stores) return;

    stores.forEach((store) => {
      Object.entries(store).forEach(([storeName, manager]) => {
        manager.eventsSubscriber = (event: any) => {
          console.info(`Entity updated (${storeName}) :`, event);
        };
      });
    });
  }, []);

  return null;
};
