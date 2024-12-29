import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect, useState } from "react";
import {
  NOVELL_STORE_KEYS,
  novellLocalStore,
} from "./shared/localStorage/localStorage";

export const Entry = () => {
  const [ready, setReady] = useState(false);

  const init = async () => {
    // Initialize local store
    const novells = await novellLocalStore.getItem(NOVELL_STORE_KEYS.novells);
    if (!novells) {
      await novellLocalStore.setItem(NOVELL_STORE_KEYS.novells, []);
    }

    setReady(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!ready) return null;

  return <RouterProvider router={router} />;
};
