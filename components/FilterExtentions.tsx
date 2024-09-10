"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star } from "lucide-react";
import Banner from "./ui/Banner";
import FilterCard from "./ui/FilterCard";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

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

const filterOptions = ["All", "Featured", "Established publishers"];
const sortOptions = ["Most Relevant", "Highest rated"];

export function FilterExtentions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredTools, setFilteredTools] = useState<typeof extensionsData>([]);

  const [selectedFilter, setSelectedFilter] = useState(
    searchParams.get("filter") || "All",
  );
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get("sort") || "Most Relevant",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    searchParams.get("subcategory") || "",
  );

  useEffect(() => {
    setIsLoading(true);
    let filtered = extensionsData;

    if (selectedCategory) {
      filtered = filtered.filter(
        (tool) =>
          tool.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(
        (tool) =>
          tool.subcategory.toLowerCase() === selectedSubcategory.toLowerCase(),
      );
    }

    if (selectedFilter === "Featured") {
      filtered = filtered.filter((tool) => tool.featured);
    } else if (selectedFilter === "Established publishers") {
      filtered = filtered.filter((tool) => tool.established);
    }

    const sorted = filtered.sort((a, b) => {
      if (selectedSort === "Highest rated") return b.rating - a.rating;
      // For 'Most Relevant', we'll use a combination of rating and review count
      return b.rating * b.reviews - a.rating * a.reviews;
    });

    setFilteredTools(sorted);
    setIsLoading(false);
  }, [selectedFilter, selectedSort, selectedCategory, selectedSubcategory]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedFilter !== "All") params.set("filter", selectedFilter);
    if (selectedSort !== "Most Relevant") params.set("sort", selectedSort);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedSubcategory) params.set("subcategory", selectedSubcategory);

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "", { scroll: false });
  }, [
    selectedFilter,
    selectedSort,
    selectedCategory,
    selectedSubcategory,
    router,
  ]);

  const handleCategoryClick = (category: string, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  const getTitle = () => {
    if (selectedSubcategory) return selectedSubcategory;
    if (selectedCategory) return selectedCategory;
    return "All Extensions";
  };

  return (
    // TODO: Fix glitch on load
    <div className="container mx-auto flex flex-col p-4 md:flex-row">
      {/* Sidebar */}
      <aside className="mb-6 w-full md:mb-0 md:mr-8 md:w-64">
        <ScrollArea className="h-[50vh] md:h-[calc(100vh-2rem)]">
          {categories.map((category) => (
            <div key={category.name} className="mb-4">
              <h2 className="mb-2 px-4 text-lg font-semibold">
                {category.name}
              </h2>
              {category.subcategories.map((subcategory) => (
                <Button
                  key={subcategory}
                  variant={
                    selectedSubcategory === subcategory ? "secondary" : "ghost"
                  }
                  className={cn(
                    "hover:bg-text-black block w-full border-none text-left text-[#3c4043]",
                    selectedSubcategory === subcategory &&
                      "bg-[#0b57d0] text-white",
                  )}
                  onClick={() =>
                    handleCategoryClick(category.name, subcategory)
                  }
                >
                  {subcategory}
                </Button>
              ))}
            </div>
          ))}
        </ScrollArea>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        {!selectedCategory && !selectedSubcategory ? (
          <Banner />
        ) : (
          <>
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <h1 className="text-3xl font-bold">{getTitle()}</h1>
              <div className="flex w-full flex-col space-y-2 sm:w-auto sm:flex-row sm:space-x-4 sm:space-y-0">
                <Select
                  value={selectedFilter}
                  onValueChange={setSelectedFilter}
                >
                  <SelectTrigger className="w-[200px] rounded-full border-black pl-7 text-left text-xs font-semibold text-black">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>

                  <SelectContent>
                    {filterOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="w-[200px] rounded-full border-black pl-7 text-xs font-semibold text-black">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-[180px] w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {filteredTools.length > 0 ? (
                  filteredTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="transition-opacity duration-300 ease-in-out"
                    >
                      <FilterCard {...tool} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-8">
                    <p className="text-xl font-semibold text-gray-600">
                      No results found
                    </p>
                    <p className="mt-2 text-gray-500">
                      Try adjusting your filter or sort criteria
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
