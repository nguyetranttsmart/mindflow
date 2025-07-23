"use client"
import { useSearchParams, useRouter, usePathname } from "next/navigation";
export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
    const params = new URLSearchParams();
    if (term) {
      params.set('query', term)
    }
    else {
      params.delete('query')
    }
    replace(`${pathName}?${params.toString()}`)
    console.log(term)
  }

  return (
    <div className="flex justify-center w-full px-0 py-2.5">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input className="py-2 px-3 border-2 border-solid border-black bg-white max-w-325 text-black my-0 mx-auto w-full transition-[width] duration-300 ease-in-out text-lg"
        placeholder={placeholder}
        onChange={(e) => { handleSearch(e.target.value) }}
        defaultValue={searchParams.get('query')?.toString()} />
    </div>
  )
}
