import React from "react";
import { Card } from "../card";
import Image from "next/image";
import { InfoIcon, StarFullIcon } from "../svgIcons";

type Tool = {
  name?: string;
  rating?: number;
  reviews?: number;
  description?: string;
  featured?: boolean;
  established?: boolean;
};

export default function FilterCard({
  name,
  rating,
  reviews,
  description,
  featured,
}: Tool) {
  return (
    <Card className="rounded-[20px] border-none bg-[#eff2ef] p-4 shadow-none">
      <div className="relative mb-3 h-[140px] w-full overflow-hidden rounded-[20px]">
        <Image
          src={`https://dummyimage.com/560x312.png/ff4444/ffffff`}
          alt={name ?? "placeholder"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {featured && (
          <span className="absolute right-2 top-2 rounded-full bg-[#0b57d0] px-2 py-1 text-[10px] text-white">
            Featured
          </span>
        )}
      </div>

      <h3 className="mb-1 text-base font-semibold text-black">{name}</h3>

      <div>
        <div className="flex items-center gap-0.5 text-xs text-black">
          <span className="font-semibold">{rating?.toFixed(1)}</span>
          <StarFullIcon className="size-4" />
          {/* TODO: Fix ellipsis */}
          <span className="line-clamp-2">({reviews})</span>

          {/* TODO: Make this a component */}
          <InfoIcon className="size-[14px]" />
        </div>

        <p className="mt-2 text-xs">{description}</p>
      </div>
    </Card>
  );
}
