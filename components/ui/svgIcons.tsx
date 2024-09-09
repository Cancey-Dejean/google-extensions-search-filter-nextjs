import React, { SVGProps } from "react";

export const InfoIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      focusable="false"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path>
    </svg>
  );
};
export const StarFullIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      focusable="false"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"></path>
    </svg>
  );
};
