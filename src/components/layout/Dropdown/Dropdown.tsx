import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { PanelRight } from "lucide-react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Table",
    url: "/table",
    icon: Inbox,
  },
  {
    title: "Shopify",
    url: "/shopifyProducts",
    icon: Settings,
  },
];

export function Dropdown() {
  return (
    <div className="p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <PanelRight />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item, index) => (
            <DropdownMenuItem key={index}>
              <Link href={item.url} aria-label={item.title} className="">
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
