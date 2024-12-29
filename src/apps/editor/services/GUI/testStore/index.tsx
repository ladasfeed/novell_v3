import { AssetEntityManager } from "../../../rdb-store/entities/assets";
import {
  useEntities,
  useEntity,
} from "../../../../../packages/rdb/_core/hooks";
import { novellEffects } from "../../../rdb-store/modules/novellModule";

const ImageLocal = ({ id }: { id: string }) => {
  const entity = useEntity(AssetEntityManager, id);

  const changeSource = (id: string) => {
    novellEffects.asset.edit(
      id,
      "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg"
    );
  };

  if (!entity) return;

  return (
    <img
      width={100}
      onClick={() => changeSource(entity.id)}
      key={entity.id}
      src={entity.src}
    />
  );
};

const AssetsManager = () => {
  const assets = useEntities(AssetEntityManager);

  const addImageHandler = () => {
    novellEffects.asset.create(
      "image",
      "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg"
    );
  };

  return (
    <div>
      <button onClick={addImageHandler}>Add image</button>
      <div>
        <h3>Images</h3>
        <ul>
          {assets
            .filter((v) => v.type === "image")
            .map((img) => (
              <ImageLocal key={img.id} {...img} />
            ))}
        </ul>
      </div>
    </div>
  );
};
