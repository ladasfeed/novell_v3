import { useState } from "react";
import { StaticApi } from "../../../../../../api/modules/staticApi";
import { useNovellState } from "../../../../../../shared/hooks/useNovellState";
import s from "./styles.module.scss";
import { STATIC_URL } from "@/configs/editorconfig";
import { Button } from "@/shared/components/Button";

export const GeneralGUI = () => {
  const { currentNovell, setCurrentNovell } = useNovellState();
  const [fileUploading, setIsFileUploading] = useState(false);

  const onPictureChange: React.ChangeEventHandler<HTMLInputElement> = async (
    ev
  ) => {
    setIsFileUploading(true);
    const file = ev.target.files![0];

    const response = await StaticApi.uploadFile(file);
    setIsFileUploading(false);

    if (currentNovell) {
      setCurrentNovell({
        ...currentNovell,
        image: response.filename,
      });
    }
  };

  return (
    <div className={s.container}>
      <div className={s.image}>
        {fileUploading && <div>Uploading...</div>}
        {currentNovell?.image && (
          <img
            src={STATIC_URL + currentNovell?.image}
            alt=""
            width={100}
            height={100}
          />
        )}
        <input
          hidden
          id="novellPicture"
          type="file"
          onChange={onPictureChange}
        />
        <Button htmlFor="novellPicture" type="submit">
          Change image
        </Button>
      </div>
    </div>
  );
};
