import { novellApi } from "@/api/modules/novellApi";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export const useNovell = (novellId: string) => {
    const { chapterId } = useParams();
    const [loading, setLoading] = useState(false);
    const [novell, setNovell] = useState<any>()

    const initNovells = async () => {
        setLoading(true)
        const novell = await novellApi.getNovell(novellId)
        setNovell(novell)
        setLoading(false)
    }

    useEffect(() => {
        initNovells();
    }, [chapterId])

    return {
        novell,
        loading
    }
}