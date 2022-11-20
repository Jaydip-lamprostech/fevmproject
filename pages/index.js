import Head from "next/head";
import Image from "next/image";
import BackgroundAnimation from "../src/components/BackgroundAnimation";
import styles from "../styles/Home.module.css";
import boy from "../src/assets/boy.png";
import Prism from "prismjs";
import "animate.css";
import "prismjs/themes/prism-twilight.css";
import "prismjs/components/prism-jsx.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { useEffect, useRef } from "react";

export default function Home() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  const logoref = useRef();

  const lending = `<div className={styles.main}>
  <section className={styles.hero}>
    <div className={styles.heroinsidefirst}>
      <h1 className="heroh1 animate__animated animate__fadeInDown">
        Smart Contracts
      </h1>
      <p className="herop1 animate__animated animate__fadeInDown">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
        reiciendis nam vero vitae rerum expedita sequi totam commodi
        dignissimos numquam?
      </p>
      <button className="herofirstbutton animate__animated animate__fadeInDown">
        Learn more
      </button>
    </div>
    <div className="heroinsidesecond animate__animated animate__fadeIn">
      <div className="inside animate__animated animate__fadeIn">
        <Image className="heroimage" src={boy} alt="boy-image" />
      </div>
      <BackgroundAnimation />
    </div>
  </section>
  <section className={styles.secondsection}>
    <h2 className="contractsheading">Contracts</h2>
    <div className={styles.contractdiv}>
      <h2>Lending contract</h2>
      <span className={styles.features}>
        <ul>
          <li>
            Create a pool contract that accepts deposit from lenders and
            borrow money to the borrowers
          </li>
          <li>
            Lenders can lend any amount of money and earn some interest for
            it.
          </li>
          <li>
            User or borrower can borrow some amount of tokens (limited) ,
            and pay back with interest for some time period.
          </li>
          <li>
            Interest is calculated according the interest rate and borrowing
            time peroid
          </li>
          <li>
            Lender can withdraw the amount later with extra interest earning
          </li>
          <li>
            Other functions can be called to determine the balance at any
            point of time , and the rewards earned
          </li>
        </ul>
      </span>
      <div className="parentofcode">
        <span className={styles.code}>
          <pre className="line-numbers">
            <code className="language-jsx">{lending}</code>
          </pre>
        </span>
      </div>
    </div>
    <div className={styles.contractdiv}>
      <h2>Lending contract</h2>
      <span className={styles.features}>
        <ul>
          <li>
            Create a pool contract that accepts deposit from lenders and
            borrow money to the borrowers
          </li>
          <li>
            Lenders can lend any amount of money and earn some interest for
            it.
          </li>
          <li>
            User or borrower can borrow some amount of tokens (limited) ,
            and pay back with interest for some time period.
          </li>
          <li>
            Interest is calculated according the interest rate and borrowing
            time peroid
          </li>
          <li>
            Lender can withdraw the amount later with extra interest earning
          </li>
          <li>
            Other functions can be called to determine the balance at any
            point of time , and the rewards earned
          </li>
        </ul>
      </span>
      <div className="parentofcode">
        <span className={styles.code}>
          <pre className="line-numbers">
            <code className="language-jsx">{lending}</code>
          </pre>
        </span>
      </div>
    </div>
    <div className={styles.contractdiv}>
      <h2>Lending contract</h2>
      <span className={styles.features}>
        <ul>
          <li>
            Create a pool contract that accepts deposit from lenders and
            borrow money to the borrowers
          </li>
          <li>
            Lenders can lend any amount of money and earn some interest for
            it.
          </li>
          <li>
            User or borrower can borrow some amount of tokens (limited) ,
            and pay back with interest for some time period.
          </li>
          <li>
            Interest is calculated according the interest rate and borrowing
            time peroid
          </li>
          <li>
            Lender can withdraw the amount later with extra interest earning
          </li>
          <li>
            Other functions can be called to determine the balance at any
            point of time , and the rewards earned
          </li>
        </ul>
      </span>
      <div className="parentofcode">
        <span className={styles.code}>
          <pre className="line-numbers">
            <code className="language-jsx">{lending}</code>
          </pre>
        </span>
      </div>
    </div>
  </section>
</div>`;
  // const button = document.getElementById("logo_image");

  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroinsidefirst}>
          <h1 className="heroh1 animate__animated animate__fadeInDown">
            Smart Contracts
          </h1>
          <p className="herop1 animate__animated animate__fadeInDown">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            reiciendis nam vero vitae rerum expedita sequi totam commodi
            dignissimos numquam?
          </p>
          <button className="herofirstbutton animate__animated animate__fadeInDown">
            Learn more
          </button>
        </div>
        <div className="heroinsidesecond animate__animated animate__fadeIn">
          <div className="inside animate__animated animate__fadeIn">
            <Image className="heroimage" src={boy} alt="boy-image" />
          </div>
          <BackgroundAnimation />
        </div>
      </section>
      <section className={styles.secondsection}>
        <h2 className="contractsheading">Contracts</h2>
        <div className={styles.contractdiv} id="lending">
          <h2>Lending contract</h2>
          <span className={styles.features}>
            <ul>
              <li>
                Create a pool contract that accepts deposit from lenders and
                borrow money to the borrowers
              </li>
              <li>
                Lenders can lend any amount of money and earn some interest for
                it.
              </li>
              <li>
                User or borrower can borrow some amount of tokens (limited) ,
                and pay back with interest for some time period.
              </li>
              <li>
                Interest is calculated according the interest rate and borrowing
                time peroid
              </li>
              <li>
                Lender can withdraw the amount later with extra interest earning
              </li>
              <li>
                Other functions can be called to determine the balance at any
                point of time , and the rewards earned
              </li>
            </ul>
          </span>
          <div className="parentofcode">
            <span className={styles.code}>
              <pre className="line-numbers">
                <code className="language-jsx">{lending}</code>
              </pre>
            </span>
          </div>
        </div>
        <div className={styles.contractdiv} id="staking">
          <h2>Lending contract</h2>
          <span className={styles.features}>
            <ul>
              <li>
                Create a pool contract that accepts deposit from lenders and
                borrow money to the borrowers
              </li>
              <li>
                Lenders can lend any amount of money and earn some interest for
                it.
              </li>
              <li>
                User or borrower can borrow some amount of tokens (limited) ,
                and pay back with interest for some time period.
              </li>
              <li>
                Interest is calculated according the interest rate and borrowing
                time peroid
              </li>
              <li>
                Lender can withdraw the amount later with extra interest earning
              </li>
              <li>
                Other functions can be called to determine the balance at any
                point of time , and the rewards earned
              </li>
            </ul>
          </span>
          <div className="parentofcode">
            <span className={styles.code}>
              <pre className="line-numbers">
                <code className="language-jsx">{lending}</code>
              </pre>
            </span>
          </div>
        </div>
        <div className={styles.contractdiv} id="vault">
          <h2>Lending contract</h2>
          <span className={styles.features}>
            <ul>
              <li>
                Create a pool contract that accepts deposit from lenders and
                borrow money to the borrowers
              </li>
              <li>
                Lenders can lend any amount of money and earn some interest for
                it.
              </li>
              <li>
                User or borrower can borrow some amount of tokens (limited) ,
                and pay back with interest for some time period.
              </li>
              <li>
                Interest is calculated according the interest rate and borrowing
                time peroid
              </li>
              <li>
                Lender can withdraw the amount later with extra interest earning
              </li>
              <li>
                Other functions can be called to determine the balance at any
                point of time , and the rewards earned
              </li>
            </ul>
          </span>
          <div className="parentofcode">
            <span className={styles.code}>
              <pre className="line-numbers">
                <code className="language-jsx">{lending}</code>
              </pre>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
