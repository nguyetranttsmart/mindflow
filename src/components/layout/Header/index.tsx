"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];
export default function Header() {
  const pathname = usePathname();
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
      </ul>
    </nav>
  );
}
