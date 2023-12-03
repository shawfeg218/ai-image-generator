"use client";

import { fetchImage } from "@/lib/fetchImage";
import Image from "next/image";
import useSWR from "swr";
import { Button } from "./ui/button";

type Image = {
  name: string;
  url: string;
};

export default function Images() {
  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR("images", fetchImage, {
    revalidateOnFocus: false,
  });

  return (
    <div>
      {isLoading && (
        <p className="animate-pulse text-center pb-7 font-extralight">
          Loading <span className="text-violet-400">AI</span> Generated Images...
        </p>
      )}

      <Button className="fixed bottom-10 right-10" onClick={() => refreshImages(images)}>
        {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
      </Button>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10">
        {images?.imageUrls?.map((image: Image, index: number) => {
          return (
            <div
              key={image.name}
              className={`relative cursor-help ${
                index === 0 && "md:col-span-2 md:row-span-2"
              } hover:scale-[1.03] transition-transform duration-200 ease-in-out`}
            >
              <Image
                src={image.url}
                alt={image.name}
                width={800}
                height={800}
                className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
