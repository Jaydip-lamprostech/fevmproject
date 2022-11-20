import React, { useState } from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [address, setAddress] = useState("");

  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <span className={styles.logo}>
            <Link href={"/"}>
              {/* <Image src={logo} alt="logo" /> */}
              <h1>LOGO</h1>
            </Link>
          </span>
          <ul
            className={
              isExpanded === false
                ? styles.navmenu
                : styles.navmenu + " " + styles.active
            }
          >
            <li className={styles.navitem}>
              <span>
                <a
                  //   target="_blank"
                  //   rel="noopener noreferrer"
                  href="#lending"
                  className={styles.navlink}
                >
                  Lending
                </a>
              </span>
            </li>
            <li className={styles.navitem}>
              <span>
                <a
                  //   target="_blank"
                  //   rel="noopener noreferrer"
                  href="#staking"
                  className={styles.navlink}
                >
                  Staking
                </a>
              </span>
            </li>
            <li className={styles.navitem}>
              <span>
                <a
                  //   target="_blank"
                  //   rel="noopener noreferrer"
                  href="#vault"
                  className={styles.navlink}
                >
                  Vault
                </a>
              </span>
            </li>
          </ul>
          <button
            onClick={handleClick}
            className={
              isExpanded === false
                ? styles.hamburger
                : styles.hamburger + " " + styles.active
            }
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </nav>
      </header>

      {children}
    </>
  );
}
