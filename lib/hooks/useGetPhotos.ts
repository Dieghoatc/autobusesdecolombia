"use client";

import { useState, useEffect } from "react";
import { photosQuery } from "@/services/api/photos.query";
import { ApiPhotosResponse } from "@/services/types/photo.type";
import usePhotosStore from "@/lib/store/usePhotosStore";
import { orderById } from "@/lib/helpers/orderById";

export function useGetPhotos() {
  const [photos, setPhotos] = useState<ApiPhotosResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const setPhotosStore = usePhotosStore((state) => state.setPhotos);
  const setCategoryStore = usePhotosStore((state) => state.setCategory);
  const setLoadingStore = usePhotosStore((state) => state.setLoading);

  function formatPhotosData(data : ApiPhotosResponse[]) {
    const order = orderById(data, "photo_id");
    return order[0]
  }

  function findForCategory(data: ApiPhotosResponse[], category: number) {
    return data.filter((photo) => photo.category_id === category);
  }

  useEffect(() => {
    async function fetchPhotos() {
      setLoading(true);
      setError("");

      try {
        const result = await photosQuery();      
        setPhotos(result as ApiPhotosResponse[]);
        const resultFormat = formatPhotosData(result as ApiPhotosResponse[]);
        setPhotosStore(resultFormat);
        const category = findForCategory(result as ApiPhotosResponse[], 5);
        const categoryFormat = formatPhotosData(category);
        setCategoryStore(categoryFormat);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoadingStore(false);
        setLoading(false);
      }
    }
    fetchPhotos();
  }, [setPhotosStore, setLoadingStore, setCategoryStore]);

  return { photos, loading, error };
}
