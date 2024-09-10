import { Button } from "../button";
import Link from "next/link";

export default function Banner() {
  return (
    <section>
      <h1 className="mb-6 text-[32px] font-bold">Extensions</h1>
      <div
        className="relative min-h-[230px] overflow-hidden rounded-[20px]"
        style={{ backgroundImage: `url("/images/banner.png")` }}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[526px] px-[52px]">
            <div className="flex flex-col gap-2">
              <h1 className="text-[28px] font-bold">
                Editors&apos; Picks for you
              </h1>
              <p className="text-base">Handpicked by Chrome Editors</p>
            </div>

            <Button asChild className="mt-3 text-sm" variant="outline">
              <Link href="/extensions">See Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
