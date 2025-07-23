"use client";
import Search from "@/components/commons/Search";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];
export default function Header() {
  const pathname = usePathname();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <ul className={styles.navList}>
        <div className={styles.leftItems}>
          {navLinks.map((link) => (
            <li
              key={link.href}
              className={`${styles.navItem} ${pathname === link.href ? styles.active : ""
                }`}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}

        </div>
        <li className={styles.navItem}>
          <FaSearch className={styles.searchIcon} onClick={() => setIsSearching(!isSearching)} />
        </li>
      </ul>
      {isSearching && (
        <Search placeholder="Search invoices..." />

      )}
    </nav>
  );
}
