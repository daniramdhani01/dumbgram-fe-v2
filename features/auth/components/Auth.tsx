import Image from "next/image";
import { Suspense } from "react";
import ModalAuth from "./ModalAuth";
import { Skeleton } from "@/components/ui/skeleton";

export default function Auth() {
  return (
    <div className="flex justify-center">
      <main className="p-10 md:flex md:max-w-7xl">
        <section className="md:w-2/5 md:pr-8">
          <Image
            src="/logo.svg"
            alt="Dumbgram"
            width={381}
            height={124}
          />
          <div className="mt-16 mb-8">
            <h1 className="block font-bold text-5xl leading-16">Share your best photos or videos</h1>
            <span className="block text-primary/60 mt-4">
              Join now, share your creations with another<br/>
              people and enjoy other creations.
            </span>
          </div>
          <div className="flex gap-4">
            <Suspense fallback={
              <>
                <Skeleton className="w-36 h-10" />
                <Skeleton className="w-36 h-10" />
              </>
            }>
              <ModalAuth/>
            </Suspense>
          </div>
        </section>

        <section className="md:md:w-3/5 md:pl-8 pt-8 md:pt-0">
          <Image
            src="/image_wall.png"
            alt="Image Wall"
            width={607}
            height={628}
          />
        </section>
      </main>
    </div>
  )
}
