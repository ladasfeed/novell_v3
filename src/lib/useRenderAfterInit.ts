import { useEffect, useState } from "react";

export const useRenderAfterInit = () => {
    const [_, setDidMount] = useState(false);

    useEffect(() => {
        setDidMount(true);
    }, []);
}