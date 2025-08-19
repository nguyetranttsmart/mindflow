import { Table } from "@tanstack/react-table";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const FilterItems = ({
  item,
  onSelect,
}: {
  item: { id: number; name: string };
  onSelect: (value: string) => void;
}) => (
  <div
    className={`flex cursor-pointer border-b-2 px-2 py-1 } hover:bg-gray-100`}
    onClick={() => onSelect(item.name)}
  >
    {item.name}
  </div>
);

type DataTableFilterProps<TData> = {
  table: Table<TData>;
  options: { id: number; name: string }[];
};
export function DataTableFilters<TData>({
  table,
  options,
}: DataTableFilterProps<TData>) {
  const [open, setOpen] = useState(false);
  const filterState = table.getState().columnFilters;
  console.log("filterState", filterState);

  const handleFilter = (value: string) => {
    const otherFilterState = filterState.filter((f) => f.id !== "category");
    if (value === "All") {
      table.setColumnFilters(otherFilterState);
      setOpen(false);
      return;
    }
    table.setColumnFilters([
      ...otherFilterState,
      { id: "category", value: value },
    ]);
    setOpen(false);
  };

  return (
    <div>
      {" "}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Category
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <FilterItems item={{ id: 0, name: "All" }} onSelect={handleFilter} />
          {options.map((option) => {
            return (
              <FilterItems
                item={option}
                key={option.id}
                onSelect={handleFilter}
              />
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
