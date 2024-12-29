import { NOVELL_STORE_KEYS, novellLocalStore } from "../../shared/localStorage/localStorage";
import { NovellType } from "../../types";

class NovellApi {
    public userId?: string | number

    constructor() { }

    async getNovellsMeta() {
        const novells = (await novellLocalStore.getItem(NOVELL_STORE_KEYS.novells)) as NovellType[];

        return novells.map(n => {
            const novellCopy = { ...n };
            // @ts-ignore intresting...
            delete novellCopy.chapters;
            return novellCopy
        })
    }

    async getNovell(id: string): Promise<NovellType | undefined> {
        const novells = (await novellLocalStore.getItem(NOVELL_STORE_KEYS.novells)) as NovellType[];
        return novells.find(n => n.id === id)
    }

    async createNovell(novellId: string, title?: string) {
        const novell: NovellType = {
            id: novellId,
            title: title || '',
            assets: {},
            chapters: []
        }
        const novells = (await novellLocalStore.getItem(NOVELL_STORE_KEYS.novells)) as NovellType[];

        await novellLocalStore.setItem(NOVELL_STORE_KEYS.novells, [...novells, novell])

        return novell
    }

    async saveNovell(id: string, newNovell: NovellType) {
        const novells = (await novellLocalStore.getItem(NOVELL_STORE_KEYS.novells)) as NovellType[];

        const newNovells = novells.map(n => {
            if (n.id === id) return newNovell
            return n
        })

        await novellLocalStore.setItem(NOVELL_STORE_KEYS.novells, newNovells)
    }
}

export const novellApi = new NovellApi();