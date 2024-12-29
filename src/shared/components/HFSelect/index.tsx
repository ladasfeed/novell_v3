import { Control, Controller } from "react-hook-form";
import { InputActionMeta } from "react-select";
import Select from "react-select";
import s from "./styles.module.scss";

type PropsType = {
  name: string;
  placeholder?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  control: Control<any>;
  className?: string;
};

export const HFSelect = (props: PropsType) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState, formState }) => {
        return (
          <Select
            className={props.className}
            placeholder={props.placeholder}
            value={props.options.find((option) => option.value === field.value)}
            onChange={(event: any) => {
              if (event) {
                field.onChange(event.value);
              }
            }}
            options={props.options}
          />
        );
      }}
    ></Controller>
  );
};
