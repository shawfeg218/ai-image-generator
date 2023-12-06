import Images from "@/components/Images";
import { Suspense } from "react";

export const revalidate = 900;

export default function Home() {
  return (
    <main className="mx-0">
      <Suspense
        fallback={
          <p className="animate-pulse text-center pb-7 font-extralight">
            Loading <span className="text-violet-400">AI</span> Generated Images...
          </p>
        }
      >
        <Images />
      </Suspense>
    </main>
  );
}
