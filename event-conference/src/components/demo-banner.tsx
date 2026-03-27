"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./demo-banner.module.css";

const BACK_URL = "https://k2digitalmedia.ca";
const LOGO_URL = "/Logo.png";

export function DemoBanner() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className={styles.navStrip}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.navText}>This is a demo site built by</span>
        <a
          className={styles.brandLink}
          href={BACK_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          K2 Digital Media
        </a>
        <span className={styles.navDivider} aria-hidden="true">
          /
        </span>
        <a
          className={styles.backButton}
          href={BACK_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go Back
        </a>
      </div>

      <div className={styles.sideWrap}>
        <button
          type="button"
          className={styles.sideTab}
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="k2-demo-panel"
          aria-label={isOpen ? "Collapse demo panel" : "Expand demo panel"}
        >
          <span className={styles.sideArrow} aria-hidden="true">
            {isOpen ? ">" : "<"}
          </span>
          <span className={styles.sideTabText}>Demo</span>
        </button>
        <aside
          id="k2-demo-panel"
          className={`${styles.sidePanel} ${!isOpen ? styles.sidePanelClosed : ""}`}
        >
          <div className={styles.logoWrap}>
            <Image src={LOGO_URL} alt="K2 Digital Media" width={48} height={48} />
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Demo Site
          </div>
          <p className={styles.sideText}>
            This is a demo built by <strong>K2 Digital Media</strong>
          </p>
          <a
            className={styles.cta}
            href={BACK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Back to K2DM
          </a>
        </aside>
      </div>

      <div className={styles.footerStrip}>
        <Image src={LOGO_URL} alt="K2 Digital Media" width={18} height={18} />
        <span>Demo by</span>
        <a
          className={styles.footerBrand}
          href={BACK_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          K2 Digital Media
        </a>
        <span className={styles.footerDivider} aria-hidden="true">
          |
        </span>
        <a
          className={styles.footerLink}
          href={BACK_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Main Site
        </a>
      </div>
    </>
  );
}
