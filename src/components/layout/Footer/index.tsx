import React from "react";
import styles from "./Footer.module.css";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutubeSquare,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.leftSection}>
        <div className={styles.headerDescription}>
          <h1 className={styles.heading}>Join To Know More About Us</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            nam accusantium eius temporibus!
          </p>
        </div>
        <form>
          <input type="email" placeholder="Email Address" />
          <button>{">"}</button>
        </form>
        <div className={styles.iconList}>
          <Link href="https://www.facebook.com/ozhairandbeauty">
            <FaFacebook />
          </Link>
          <Link href="https://www.facebook.com/ozhairandbeauty">
            <FaInstagram />
          </Link>

          <Link href="https://www.facebook.com/ozhairandbeauty">
            <FaYoutubeSquare />
          </Link>

          <Link href="https://www.facebook.com/ozhairandbeauty">
            <FaTiktok />
          </Link>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.certificate}>
          <div className={styles.totalRate}>
            <p className={styles.rate}>1.1M</p>
          </div>
          <div className={styles.certificateInfo}>
            <div className={styles.starIcon}>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>

            <p>Certified reviews</p>
            <span>Powered by Bazaarvoice</span>
          </div>
        </div>
        <div className={styles.link}>
          <h4>Site info</h4>
          <Link href="/">About us</Link>
          <Link href="/">Term and codition</Link>
          <Link href="/">Payment Option</Link>
          <Link href="/">Terms to Use</Link>
          <Link href="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
