import React, { useContext } from "react";

type GUIContextType = {};

export const GUIContext = React.createContext<GUIContextType>({});

export const useGUIContext = () => useContext(GUIContext);
