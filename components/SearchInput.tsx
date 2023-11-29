"use client";
import qs from "query-string";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currentCategoryId,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, router, pathname, currentCategoryId]);
  return (
    <div className="relative">
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-800" />
      <Input
        type="text"
        placeholder="Search for a course..."
        onChange={(e) => setValue(e.target.value)}
        className="pl-8 w-full md:w-[300px] rounded-full outline-0 border-sky-200 focus:border-0 focus-visible:ring-sky-500 transition"
      />
    </div>
  );
};

export default SearchInput;
