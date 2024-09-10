import { categories, extensionsData } from "@/lib/dummyData";
import { NextResponse } from "next/server";

// Mock data for tools

export async function GET(request: Request) {
  // Simulate a delay to mimic a real API call
  // await new Promise((resolve) => setTimeout(resolve, 500));

  // Get query parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");

  // Filter extensions based on category and subcategory
  let filteredExtensions = extensionsData;
  if (category) {
    filteredExtensions = filteredExtensions.filter(
      (ext) => ext.category.toLowerCase() === category.toLowerCase(),
    );
  }
  if (subcategory) {
    filteredExtensions = filteredExtensions.filter(
      (ext) => ext.subcategory.toLowerCase() === subcategory.toLowerCase(),
    );
  }

  // Apply additional filters
  if (filter === "Featured") {
    filteredExtensions = filteredExtensions.filter((ext) => ext.featured);
  } else if (filter === "Established publishers") {
    filteredExtensions = filteredExtensions.filter((ext) => ext.established);
  }

  // Sort extensions
  if (sort === "Highest rated") {
    filteredExtensions.sort((a, b) => b.rating - a.rating);
  } else {
    // Default sort: Most Relevant (using a combination of rating and review count)
    filteredExtensions.sort(
      (a, b) => b.rating * b.reviews - a.rating * a.reviews,
    );
  }

  // Prepare the response
  const response = {
    extensions: filteredExtensions,
    categories: categories,
  };

  return NextResponse.json(response);
}
