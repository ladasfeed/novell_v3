import { Shape } from "konva/lib/Shape";
import { RefObject, useEffect } from "react";

export const useKonvaHover = (ref: RefObject<Shape<any>>) => {
    useEffect(() => {
        if (!ref.current) return;

        ref.current?.shadowBlur(10);
        ref.current?.shadowColor("white");
        ref.current?.shadowEnabled(false);
    }, []);

    const onMouseEnter = () => {
        if (!ref.current) return;
        ref.current?.shadowEnabled(true);
    };

    const onMouseLeave = () => {
        if (!ref.current) return;
        ref.current?.shadowEnabled(false);
    };

    return {
        onMouseEnter,
        onMouseLeave,
    };
};