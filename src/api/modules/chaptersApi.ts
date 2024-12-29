import { novellApi } from "./novellApi";

class ChaptersApi {
    public chaptersId: string | null = null;

    constructor() {

    }

    async getAll(novellId: string) {
        const novell = await novellApi.getNovell(novellId);
        return novell?.chapters;
    }
}

export const chaptersApi = new ChaptersApi();