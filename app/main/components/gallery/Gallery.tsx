import { useState, useMemo } from "react";
import { useGetPhotos } from "@/lib/hooks/useGetPhotos";

import { orderById } from "@/lib/helpers/orderById";

import SkeletonComponent from "../skeleton/Skeleton";
import TabsCategories from "./components/tabs/TabsCategories";
import SearchGallery from "./components/search/SearchGallery";

import "./gallery.css";
import { ImageCard } from "@/app/main/components/gallery/components/imageCard";
import { MobileGallery } from "./components/mobileGallery";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

interface CategoryList {
  key: string;
  label: string;
  id?: number;
}
const categoriesList: CategoryList[] = [
  { key: "all", label: "Todos" },
  { key: "interdepartamental", label: "Interdepartamental", id: 1 },
  { key: "intermunicipal", label: "Intermunicipal", id: 2 },
  { key: "nuestros_recuerdos", label: "Nuestros Recuerdos", id: 5 },
];
export function Gallery() {
  const { photos, loading } = useGetPhotos();
  const [category, setCategory] = useState("all");
  const [searchPhoto, setSearchPhoto] = useState("");

  const isMobile = useIsMobile();

  const searchPhotosMemo = useMemo(
    () =>
      (photos || []).filter(
        (photo) =>
          photo.serial.includes(searchPhoto) ||
          photo.company.includes(searchPhoto) ||
          photo.bodywork.includes(searchPhoto) ||
          photo.chassis.includes(searchPhoto) ||
          photo.author.includes(searchPhoto)
      ),
    [photos, searchPhoto]
  );

  const sortedData = useMemo(
    () => orderById(searchPhotosMemo, "photo_id"),
    [searchPhotosMemo]
  );

  const selectedCategory = categoriesList.find((cat) => cat.key === category);

  const filteredData = useMemo(() => {
    if (!selectedCategory?.id) return sortedData;

    return sortedData.filter(
      (photo) => photo.category_id === selectedCategory.id
    );
  }, [sortedData, selectedCategory]);

  function searchPhotos(search: string) {
    setSearchPhoto(search);
  }

  if (loading) return <SkeletonComponent />;

  if (isMobile) return <MobileGallery images={photos} />;
  
  return (
    <div className="gallery-container" id="gallery">
      <div className="galley-controls">
        <TabsCategories
          categoriesList={categoriesList}
          setCategory={setCategory}
        />
        <SearchGallery search={searchPhotos} />
      </div>
      <div className="cards-container">
        {filteredData.map((photo) => (
          <ImageCard key={photo.photo_id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
