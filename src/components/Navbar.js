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
              <h1 className="logo-h1">
                <span className="span-1">U</span>
                <span className="span-2">p</span>
                <span className="span-3">T</span>
                <span className="span-4">o</span>
                <span className="span-5">D</span>
                <span className="span-6">a</span>
                <span className="span-7">t</span>
                <span className="span-8">a</span>
                {/* UpToData */}
              </h1>
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
                  href="#dao"
                  className={styles.navlink}
                >
                  DAO
                </a>
              </span>
            </li>
            <li className={styles.navitem}>
              <span>
                <a
                  //   target="_blank"
                  //   rel="noopener noreferrer"
                  href="#dealdata"
                  className={styles.navlink}
                >
                  DealData
                </a>
              </span>
            </li>
            <li className={styles.navitem}>
              <span>
                <a
                  //   target="_blank"
                  //   rel="noopener noreferrer"
                  href="#token"
                  className={styles.navlink}
                >
                  Token
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
      {/* footer */}
      <div className={styles.container}>
        <footer className={styles.footer}>
          <span>Hacked</span>
          <span>@</span>
          ETHGlobal&apos;s
          <a
            target="_blank"
            href="https://fevm.ethglobal.com/"
            rel="noopener noreferrer"
          >
            Hack FEVM
          </a>
          <span className="miro-link">
            <a
              target="_blank"
              href="https://miro.com/app/board/uXjVPBvZqS4=/?share_link_id=108563393303"
              rel="noopener noreferrer"
            >
              Miro Board
            </a>
          </span>
        </footer>
      </div>
    </>
  );
}
