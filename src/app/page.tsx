import ProfileCard from "@/components/ProfileCard/ProfileCard";

export default function Page() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-4 items-center justify-center">
      <section className="md:col-span-1">
        <ProfileCard />
      </section>
    </main>
  );
}
