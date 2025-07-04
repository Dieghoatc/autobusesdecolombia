import { LastPhotos } from "../lastPhotos";
import { CategoryList } from "../categoryList";
import { ApiPhotosResponse } from "@/services/types/photo.type";

interface MobileGalleryProps {
  images: ApiPhotosResponse[];
}

export function MobileGallery({ images }: MobileGalleryProps) {
  return (
    <div>
      <LastPhotos photos={images} />
      <CategoryList category="interdepartamental" />
      <CategoryList category="intermunicipal" />
      <CategoryList category="nuestros_recuerdos" />
      <CategoryList category="especial" />
      <CategoryList category="urbanos" />
      <CategoryList category="internacionales" />
    </div>
  );
}
