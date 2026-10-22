"use client";

import { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GithubIcon from "@/components/Icons/GitHubIcon";
import TrackedLink from "@/components/Analytics/TrackedLink";
import ThemeAside from "@/components/ThemeSelector/ThemeAside/ThemeAside";
import styles from "./SiteFrame.module.css";

const pages = [
  { href: "/", label: "Home" },
  { href: "/dev", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/language-services", label: "Language" },
  { href: "/contact", label: "Contact" }
];

export default function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  return <>
    <ThemeAside className={styles.paletteRail} />
    <div className={styles.frame}>
      <aside className={styles.sidebar} aria-label="Profile and navigation">
        <div className={styles.profile}>
          <Link href="/" aria-label="William East, home" className={styles.avatar}>
            <Image src="/images/assets/profile-portrait.png" alt="William East" fill priority sizes="(max-width: 767px) 72px, 96px" className="object-cover object-[50%_38%]" />
          </Link>
          <div>
            <p className={styles.name}>William East</p>
            <p className={styles.bio}>Developer, translator, and teacher.<br />A Brit building things in Seoul.</p>
          </div>
        </div>
        <nav className={styles.navigation} aria-label="Primary navigation">
          {pages.map(page => {
            const active = page.href === "/" ? pathname === "/" : pathname === page.href || pathname.startsWith(`${page.href}/`);
            return <Link key={page.href} href={page.href} aria-current={active ? "page" : undefined}>
              {page.label}
            </Link>;
          })}
        </nav>
        <TrackedLink href="https://github.com/wjbetech" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.github} eventName="Contact Click" eventProps={{ surface: "sidebar", target: "github" }}>
          <GithubIcon className="size-5" />
        </TrackedLink>
      </aside>
      <main id="main-content" className={styles.content}>{children}</main>
    </div>
  </>;
}
