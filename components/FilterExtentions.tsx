"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Banner from "./ui/Banner";
import FilterCard from "./ui/FilterCard";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

type Extension = {
  id: string;
  name: string;
};

type Category = {
  name: string;
  subcategories: string[];
};

export type SearchParams = { [key: string]: string | string[] | undefined };

const filterOptions = ["All", "Featured", "Established publishers"];
const sortOptions = ["Most Relevant", "Highest rated"];

export function FilterExtentions({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [filteredTools, setFilteredTools] = useState<Extension[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Update how you access search params
  const [selectedCategory, setSelectedCategory] = useState(
    (searchParams.category as string) || "",
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    (searchParams.subcategory as string) || "",
  );
  const [selectedFilter, setSelectedFilter] = useState(
    (searchParams.filter as string) || "All",
  );
  const [selectedSort, setSelectedSort] = useState(
    (searchParams.sort as string) || "Most Relevant",
  );

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedSubcategory) params.set("subcategory", selectedSubcategory);
      if (selectedFilter !== "All") params.set("filter", selectedFilter);
      if (selectedSort !== "Most Relevant") params.set("sort", selectedSort);

      try {
        const response = await fetch(`/api/extensions?${params.toString()}`);
        const data = await response.json();
        setFilteredTools(data.extensions);
        setCategories(data.categories); // Add this line
      } catch (error) {
        console.error("Error fetching data:", error);
        setFilteredTools([]);
        setCategories([]); // Add this line
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [selectedFilter, selectedSort, selectedCategory, selectedSubcategory]);

  const updateURL = (newParams: Record<string, string>) => {
    const params = new URLSearchParams();
    Object.entries({ ...searchParams, ...newParams }).forEach(
      ([key, value]) => {
        if (value) {
          params.set(key, value as string);
        } else {
          params.delete(key);
        }
      },
    );
    router.push(`?${params.toString()}`);
  };

  const handleCategoryClick = (category: string, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    updateURL({ category, subcategory });
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    updateURL({ filter: value !== "All" ? value : "" });
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    updateURL({ sort: value !== "Most Relevant" ? value : "" });
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
              {category.subcategories.map((subcategory: string) => (
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
                  onValueChange={handleFilterChange}
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

                <Select value={selectedSort} onValueChange={handleSortChange}>
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
