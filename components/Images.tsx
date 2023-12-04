import Image from "next/image";

type Image = {
  name: string;
  url: string;
};

const url = process.env.URL || "http://localhost:3000";

export default async function Images() {
  const res = await fetch(`${url}/api/getImages`, { next: { tags: ["images"] } });
  const images = await res.json();

  // console.log(images);

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10 md:pb-10">
        {images.map((image: Image, index: number) => {
          return (
            <div
              key={image.name}
              className={`${
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
