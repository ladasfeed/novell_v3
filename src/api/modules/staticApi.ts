import { STATIC_DOMAIN } from "@/configs/editorconfig";
import { axiosInstance } from "../instance";

export const StaticApi = {
    uploadFile: async (file: File) => {
        const formData = new FormData();
        formData.append('picture', file);

        const res = await axiosInstance.post(`${STATIC_DOMAIN}/upload`, formData);

        return res.data
    }
}