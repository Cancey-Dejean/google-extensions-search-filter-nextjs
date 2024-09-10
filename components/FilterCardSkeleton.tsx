import React from "react";
import { Skeleton } from "./ui/skeleton";

export function FilterCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-[180px] w-full rounded-[20px]" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
