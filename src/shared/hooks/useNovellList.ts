import { useEffect, useState } from "react"
import { NovellType } from "../../types"
import { novellApi } from "../../api/modules/novellApi"

export const useNovellList = () => {
    const [novells, setNovells] = useState<NovellType[]>([])

    const init = async () => {
        const novellsFromApi = await novellApi.getNovellsMeta();
        setNovells(novellsFromApi)
    }

    useEffect(() => {
        init()
    }, [])

    return {
        novells,
        setNovells
    }
}