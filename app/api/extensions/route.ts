import { NextResponse } from "next/server";

// Mock data for tools
const extensionsData = [
  {
    id: 1,
    name: "Hyperise",
    category: "Productivity",
    subcategory: "Communication",
    rating: 5.0,
    reviews: 276,
    description:
      "Our brains are hardwired to process images in milliseconds,...",
    featured: true,
    established: true,
  },
  {
    id: 2,
    name: "SaberTrade Browser Plugin",
    category: "Productivity",
    subcategory: "Developer Tools",
    rating: 5.0,
    reviews: 154,
    description: "Your AI-Enabled Trading Companion",
    featured: false,
    established: false,
  },
  {
    id: 3,
    name: "SEO Extension ROSSK Free",
    category: "Productivity",
    subcategory: "Tools",
    rating: 5.0,
    reviews: 148,
    description:
      "Get quick, free site analysis & SEO reports with a 5-star-rated SEO...",
    featured: true,
    established: false,
  },
  {
    id: 4,
    name: "SmartEReply",
    category: "Productivity",
    subcategory: "Communication",
    rating: 4.8,
    reviews: 130,
    description: "Create personalized comments, craft engaging posts, and...",
    featured: false,
    established: true,
  },
  {
    id: 5,
    name: "Radar – Бесплатная аналитика",
    category: "Productivity",
    subcategory: "Tools",
    rating: 4.9,
    reviews: 114,
    description: "Бесплатный инструмент для аналитики карточек товаров и...",
    featured: true,
    established: true,
  },
  {
    id: 6,
    name: "Expression Toolbar",
    category: "Productivity",
    subcategory: "Developer Tools",
    rating: 4.7,
    reviews: 105,
    description: "Power up your Tweets with AI on X.com!",
    featured: false,
    established: false,
  },
  {
    id: 7,
    name: "Art Gallery",
    category: "Lifestyle",
    subcategory: "Art & Design",
    rating: 4.6,
    reviews: 89,
    description: "Explore and share beautiful artworks...",
    featured: true,
    established: false,
  },
  {
    id: 8,
    name: "Game Center",
    category: "Lifestyle",
    subcategory: "Games",
    rating: 4.5,
    reviews: 76,
    description: "Discover and play exciting new games...",
    featured: false,
    established: true,
  },
  {
    id: 9,
    name: "Privacy Guard",
    category: "Make Chrome Yours",
    subcategory: "Privacy & Security",
    rating: 4.9,
    reviews: 203,
    description: "Enhance your browsing privacy and security...",
    featured: true,
    established: true,
  },
];

const categories = [
  {
    name: "Productivity",
    subcategories: [
      "Communication",
      "Developer Tools",
      "Education",
      "Tools",
      "Workflow & Planning",
    ],
  },
  {
    name: "Lifestyle",
    subcategories: [
      "Art & Design",
      "Entertainment",
      "Games",
      "Household",
      "Just for Fun",
      "News & Weather",
      "Shopping",
      "Social Networking",
      "Travel",
      "Well-being",
    ],
  },
  {
    name: "Make Chrome Yours",
    subcategories: [
      "Accessibility",
      "Functionality & UI",
      "Privacy & Security",
    ],
  },
];

export async function GET(request: Request) {
  // Simulate a delay to mimic a real API call
  await new Promise((resolve) => setTimeout(resolve, 500));

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
