import { useNovellState } from "../../shared/hooks/useNovellState";
import { useEffect, useState } from "react";
import s from "./styles.module.scss";
import { NovellCard } from "./components/NovellCard";
import { Button } from "@/shared/components/Button";

export const Dashboard = () => {
  const [ready, setReady] = useState(false);
  const { init: initNovells, novells, createNovell } = useNovellState();

  const createNovellHandler = () => {
    const novellId = Math.floor(Math.random() * 1000);
    createNovell(String(novellId));
  };

  const init = async () => {
    initNovells();
    setReady(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!ready) return;

  return (
    <div className={s.container}>
      <h1 className="page-title">Dashboard</h1>
      <div className={s.actions}>
        <Button onClick={createNovellHandler}>Create a novell</Button>
        <Button onClick={() => localStorage.clear()}>Reset</Button>
      </div>

      <ul className={s.novellList}>
        {novells.map((novell) => {
          return <NovellCard novell={novell} />;
        })}
      </ul>
    </div>
  );
};
