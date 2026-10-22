import Image from "next/image";
import Link from "next/link";
import type { BlogCardData, ProjectCardData } from "@/lib/homeCards";
import styles from "./StudioHomepage.module.css";

export default function StudioHomepage({ posts, projects }: { posts: BlogCardData[]; projects: ProjectCardData[] }) {
  return <div className={styles.body}>
      <section className={styles.introduction} aria-labelledby="home-introduction">
        <h1 id="home-introduction">Hi, I’m Will.</h1>
        <p>I design and build software, and work between Korean and English. Right now, I’m working on <Link href="/dev/orbit">orbit.</Link>, a calmer place to organise everyday work, and exploring how language and technology can help us think more clearly.</p>
        <p>Alongside my own projects, I take on development, translation, and teaching work. This is where I share what I’m making and the things I learn along the way.</p>
        <div className={styles.building}>
          <span>...building</span>
          <span className={styles.blocks} aria-hidden="true"><i /><i /><i /></span>
        </div>
      </section>

      <section className={styles.projects} aria-labelledby="current-projects">
        <div className={styles.sectionHeading}>
          <h2 id="current-projects">Current projects</h2>
          <Link href="/dev">All projects <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.tiles}>
          {projects.map(project => <Link key={project.slug} href={`/dev/${project.slug}`} className={styles.tile} aria-label={project.title}>
            <Image src={project.image || "/images/assets/placeholder.png"} alt="" fill sizes="(max-width: 480px) 44vw, (max-width: 767px) 28vw, 156px" className="object-cover" />
            <span className={styles.caption}>{project.title}</span>
          </Link>)}
        </div>
      </section>

      <section className={styles.blogs} aria-labelledby="recent-blogs">
        <div className={styles.sectionHeading}>
          <h2 id="recent-blogs">Recent blogs</h2>
          <Link href="/blog">All articles <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.posts}>
          {posts.slice(0, 5).map(post => <article key={post.slug}>
            <p className={styles.postMeta}><time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(post.publishedAt))}</time><span aria-hidden="true">·</span>Blog</p>
            <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
          </article>)}
        </div>
      </section>
  </div>;
}
