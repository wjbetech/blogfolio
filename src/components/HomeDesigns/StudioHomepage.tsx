import Image from "next/image";
import Link from "next/link";
import type { BlogCardData, ProjectCardData } from "@/lib/homeCards";
import styles from "./StudioHomepage.module.css";

function ProjectImage({ project, priority = false, featured = false }: { project: ProjectCardData; priority?: boolean; featured?: boolean }) {
  return (
    <Image
      src={project.image || "/images/assets/placeholder.png"}
      alt=""
      fill
      priority={priority}
      sizes={featured ? "(max-width: 767px) 92vw, (max-width: 1200px) 72vw, 880px" : "(max-width: 767px) 44vw, (max-width: 1200px) 34vw, 280px"}
      className="object-cover"
    />
  );
}

export default function StudioHomepage({ posts, projects }: { posts: BlogCardData[]; projects: ProjectCardData[] }) {
  const featured = projects.find((project) => project.slug === "wordweb") ?? projects[0];
  const selectedProjects = [...(featured ? [featured] : []), ...projects.filter((project) => project.slug !== featured?.slug)].slice(0, 6);
  const projectSubtitles: Record<string, string> = {
    "wordweb": "Explore meanings",
    "orbit": "Personal productivity",
    "picme": "Picture-word game",
    "atomology": "Periodic table game",
    "wowcomps": "Classic WoW raid planning",
    "cabin-chat": "Self-hosted real-time chat",
  };

  return (
    <div className={styles.body}>
      <section className={styles.introduction} aria-labelledby="home-introduction">
        <h1 id="home-introduction"><span>AI Engineer.</span><span>Korean ↔ English Services.</span></h1>
        <p className={styles.lede}>Currently working as an <strong>AI Engineer</strong> at a fast-paced startup based in <strong>Gangnam, Seoul</strong>.</p>
        <p className={styles.context}>Alongside engineering, I teach at <strong>Seoul University of Foreign Studies</strong> and support Korean ↔ English editing, translation, and proofreading. I also enjoy heavy metal and guitar, baking, working out, and retro gaming.</p>
      </section>

      {selectedProjects.length > 0 && <section className={styles.featured} aria-labelledby="projects-heading">
        <div className={styles.sectionHeading}>
          <h2 className={styles.sectionLabel} id="projects-heading">Projects</h2>
          <Link href="/dev">View all <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.projectGrid}>
          {selectedProjects.map((project, index) => <Link key={project.slug} href={`/dev/${project.slug}`} className={styles.projectCard} aria-label={`${project.title}: ${projectSubtitles[project.slug] ?? "Selected project"}`}>
            <div className={styles.projectTileImage}>
              <ProjectImage project={project} priority={index === 0} featured={index === 0} />
              <div className={styles.imageCaption}>
                <div>
                  <h3>{project.slug === "wordweb" ? "wordweb." : project.title}</h3>
                  <p>{projectSubtitles[project.slug] ?? "Selected project"}</p>
                </div>
                <span aria-hidden="true">↗</span>
              </div>
            </div>
          </Link>)}
        </div>
      </section>}

      <section className={styles.blogs} aria-labelledby="recent-writing">
        <div className={styles.sectionHeading}>
          <h2 id="recent-writing">Writings</h2>
        </div>
        <div className={styles.posts}>
          {posts.slice(0, 3).map((post) => <article key={post.slug} className={styles.post}>
            <p className={styles.postMeta}><time dateTime={post.publishedAt}>{new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(post.publishedAt))}</time></p>
            <div className={styles.postContent}>
              <h3><Link href={`/blog/${post.slug}`}>{post.title}<span aria-hidden="true">↗</span></Link></h3>
              <p className={styles.postBlurb}>{post.homeBlurb}</p>
            </div>
          </article>)}
        </div>
        <div className={styles.morePosts}>
          <Link href="/blog">View more articles <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><Link href="/contact">Get in touch</Link><Link href="/rss.xml">RSS</Link></div>
      </footer>
    </div>
  );
}
