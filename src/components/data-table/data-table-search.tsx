import React from "react";
import { Input } from "../ui/input";
import { Table } from "@tanstack/react-table";

type DataTableSearchProps<TData> = {
  table: Table<TData>;
};
export function DataTableSearch<TData>({ table }: DataTableSearchProps<TData>) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Search by title..."
        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="max-w-sm mx-5"
      />
    </div>
  );
}
