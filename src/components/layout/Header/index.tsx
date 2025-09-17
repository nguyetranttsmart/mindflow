"use client";
import Search from "@/components/commons/Search";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./Header.module.css";
import { Dropdown } from "../Dropdown/Dropdown";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];
export default function Header() {
  const pathname = usePathname();
  const [isSearching, setIsSearching] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState(0);
  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobile(size < 768);
  }, [size]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={`${styles.header} ${scrolled && !isMobile ? styles.scrolled : ""}`}
    >
      {isMobile ? (
        <Dropdown />
      ) : (
        <ul className={styles.navList}>
          <div className={styles.leftItems}>
            {navLinks.map((link) => (
              <li
                key={link.href}
                className={`${styles.navItem} ${
                  pathname === link.href ? styles.active : ""
                }`}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </div>

          <li className={styles.navItem}>
            <FaSearch
              className={styles.searchIcon}
              onClick={() => setIsSearching(!isSearching)}
            />
          </li>
        </ul>
      )}

      {isSearching && <Search placeholder="Search blogs..." />}
    </nav>
  );
}
