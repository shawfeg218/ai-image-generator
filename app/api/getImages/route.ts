import { getImages } from "@/lib/getImages";

export async function GET(request: Request) {
  const images = await getImages();
  return new Response(JSON.stringify(images));
}
