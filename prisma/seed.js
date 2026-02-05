// // import { Prisma, PrismaClient } from "@prisma/client";
// // const prisma = new PrismaClient();

// async function main() {
//   // Posts
//   await prisma.post.upsert({
//     where: { slug: "building-a-nextjs-application" },
//     update: {},
//     create: {
//       title: "Building a Next.js Application",
//       slug: "building-a-nextjs-application",
//       summary: "A short guide to building a Next.js application with Prisma and MDX.",
//       content: "# Example\n\nThis is sample MDX content for the post.",
//       coverImage: null,
//       tags: ["Next.js", "Prisma", "MDX"],
//       status: "PUBLISHED",
//       featured: false
//     }
//   });

//   await prisma.post.upsert({
//     where: { slug: "introducing-blogfolio" },
//     update: {},
//     create: {
//       title: "Introducing Blogfolio",
//       slug: "introducing-blogfolio",
//       summary: "An intro to this portfolio/blog platform.",
//       content: "Content for the featured post — can be MDX.",
//       coverImage: null,
//       tags: ["Portfolio", "Blog"],
//       status: "PUBLISHED",
//       featured: true
//     }
//   });

//   // Projects
//   await prisma.project.upsert({
//     where: { slug: "blogfolio" },
//     update: {},
//     create: {
//       title: "Blogfolio",
//       slug: "blogfolio",
//       summary: "This site — a minimal blogging + portfolio system.",
//       content: "Project description and notes.",
//       tags: ["Next.js", "TypeScript"],
//       repoUrl: "https://github.com/wjbetech/blogfolio",
//       demoUrl: null,
//       status: "PUBLISHED",
//       featured: true
//     }
//   });

//   console.log("Seed complete.");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
