import { getChangelogEntries } from "@/lib/changelog/entryParser";
import ChangelogEntry from "@/components/ChangelogEntry/ChangelogEntry";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { mockProjects } from "../data/projects";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function DevPage() {
  const entries = getChangelogEntries();
  return (
    <div className="container mx-auto max-w-7xl">
      <section className="">
        <h1 className="text-xl font-bold mb-2 text-headline font-serif">Dev</h1>
        <p className="text-paragraph mb-8">My own software development projects.</p>

        <div className="mb-2">
          {mockProjects.map((project) => {
            return (
              <Card key={project.title} className="mb-6 bg-bg-200 border border-accent-200 p-4 transition-transform">
                <CardHeader>
                  <Link href={project.link ?? "#"} target={project.link ? "_blank" : "_self"} rel="noopener noreferrer">
                    <CardTitle className="text-2xl font-serif">{project.title}</CardTitle>
                  </Link>
                  {project.tech && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tech.map((tag) => (
                        <Badge key={tag} className="bg-bg-100 text-headline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="text-paragraph">{project.description}</CardContent>
                <CardFooter>
                  <div className="flex items-center gap-4">
                    {project.link && (
                      <Button
                        asChild
                        variant="outline"
                        className="flex items-center gap-2 p-2 hover:bg-accent-200 hover:text-headline">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          <IconBrandGithub className="w-4 h-4" />
                          GitHub
                        </Link>
                      </Button>
                    )}
                    {project.link && (
                      <Button asChild variant="default" className="flex items-center gap-2">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          Live Demo
                          <IconArrowUpRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator className="bg-accent-100/40 my-8" />

      {/* the changelog for the blogfolio website */}
      <section>
        <h1 className="text-xl font-bold mb-2 text-headline font-serif">Changelog</h1>
        <p className="text-paragraph mb-8">Track all updates, improvements, and fixes to this application.</p>

        <div className="space-y-6">
          {entries.map((entry, idx) => (
            <ChangelogEntry key={`${entry.date}-${idx}`} entry={entry} />
          ))}
        </div>

        {entries.length === 0 && <p className="text-center text-paragraph/50 py-12">No changelog entries yet.</p>}
      </section>
    </div>
  );
}
