import React from "react";
import { useState } from "react";
import s from "./styles.module.scss";

type PropsType = {
  tabs: Array<{
    name: string;
    component: React.FC<any>;
  }>;
  defaultActive?: string | null;
};

export const TabsSwitcher = ({ tabs, defaultActive = null }: PropsType) => {
  const [active, setActive] = useState<string | null>(defaultActive);

  const render = () => {
    const entity = tabs.find((t) => t.name == active);
    if (entity) {
      return React.createElement(entity.component, { key: entity.name });
    }
    return null;
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        {tabs.map((t) => (
          <span
            key={t.name}
            onClick={() => {
              setActive(t.name);
            }}
          >
            {t.name}
          </span>
        ))}
      </div>

      <div className={s.content} key={active}>
        {render()}
      </div>
    </div>
  );
};
