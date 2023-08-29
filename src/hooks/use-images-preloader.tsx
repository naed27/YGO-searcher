"use client"

import { useEffect, useState } from "react";

interface Props {
  imageUrls: string[];
}

const useImagesPreloader = ({ imageUrls }: Props) => {
  const [isLoading, setIsLoading] = useState(() => {

    // Check if images are already cached
    const areImagesCached = imageUrls.every((url) => {
      const img = new Image();
      img.src = url;
      return img.complete;
    });

    // Return true if images are not cached, false otherwise
    const isLoadingInitially = !areImagesCached;

    return ({start: isLoadingInitially, end: isLoadingInitially === true ? true : false})
  });

  useEffect(() => {
    const preloadImages = async () => {
      const promises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setIsLoading((current)=>({...current, end: false}));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error preloading images:", error);
        setIsLoading((current)=>({...current, end: false}));
      }
    };

    preloadImages();
  }, [imageUrls]);

  return { isLoading };
};

export default useImagesPreloader;

