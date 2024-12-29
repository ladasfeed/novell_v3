import { ActionNodeType } from "@/apps/editor/rdb-store/entities/nodes";
import { HFSelect } from "@/shared/components/HFSelect";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import s from "./styles.module.scss";
import { chaptersRDBEffects } from "@/apps/editor/rdb-store/modules/chapterModule";
import { Button } from "@/shared/components/Button";

export const ActionNodeGUI = ({ entity }: { entity: ActionNodeType }) => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      options: entity.data.options || [],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    // @ts-ignore
    name: "options",
  });

  const portOptions = entity.ports.map((i) => ({
    value: i,
    label: i,
  }));

  const saveHandler = (data: {
    options: Array<{ text: string; portId: string }>;
  }) => {
    console.log("data saved", data);
    chaptersRDBEffects.actionNode.saveOptions(entity.id, data.options);
  };

  return (
    <div>
      <h4>Action Node Gui {entity.id}</h4>

      {/* <div className={s.ports}>
        <button onClick={addPortHandler}>Add port</button>
        <div className={s.portsList}>
          {nodeEntity?.ports.map((p) => {
            return (
              <div key={p}>
                {p} <span onClick={() => removePortHandler(p)}>remove</span>
              </div>
            );
          })}
        </div>
      </div> */}

      <div>
        <h5>Available ports:</h5>
        <ul>
          {entity.ports.map((p) => (
            <li>Id: {p}</li>
          ))}
        </ul>
      </div>

      <div className={s.options}>
        <div>Options</div>
        <Button onClick={() => append({ text: "", portId: "" })}>
          Create a new option
        </Button>
        <form onSubmit={handleSubmit(saveHandler)} className={s.optionsList}>
          {fields.map((field, index) => (
            <div key={field.id} className={s.option}>
              {/* @ts-ignore */}
              <input {...register(`options.${index}.text`)} />
              <HFSelect
                className={s.optionSelect}
                control={control}
                options={portOptions}
                name={`options.${index}.portId`}
              ></HFSelect>
            </div>
          ))}
          <Button>Save</Button>
        </form>
      </div>
    </div>
  );
};
