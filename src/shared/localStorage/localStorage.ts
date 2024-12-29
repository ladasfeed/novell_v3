import localforage from "localforage";
import { NovellType } from "@/types";

type LocalStorageScheme = {
    novells: NovellType[]
}

export enum NOVELL_STORE_KEYS {
    novells = "novells",
}

export const novellLocalStore = localforage.createInstance({
    name: "novellStore",
    driver: localforage.LOCALSTORAGE
});

