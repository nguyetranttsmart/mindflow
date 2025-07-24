"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [inputValue, setInputValue] = useState(
    searchParams.get("query")?.toString() || ""
  );
  const { replace } = useRouter();
  function handleSearch(term: string) {
    const params = new URLSearchParams();
    if (term === searchParams.get("query") || "") return;
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`/?${params.toString()}`);
    console.log("term:" + term);
    console.log("searchParams:" + searchParams);
    console.log("params:" + params);
    console.log("pathName:" + pathName);
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleSearch(inputValue);
  }
  return (
    <div className="flex justify-center w-full px-0 py-2.5">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <form
        onSubmit={handleSubmit}
        className="  border-2 border-solid border-gray-400 bg-transparent xl:max-w-325  max-w-[90%] text-gray-400 my-0 mx-auto w-full transition-[width] duration-300 ease-in-out text-lg flex justify-between"
      >
        <input
          className="w-[80%] py-2 px-3"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="w-[20%] font-bold bg-black text-white cursor-pointer"
        >
          Search
        </button>
      </form>
    </div>
  );
}
