export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-16">
        <h1 className="text-5xl font-bold text-headline mb-6">Blog</h1>
        <p className="text-lg text-paragraph mb-8">
          Welcome to my blog. Here I share thoughts on web development, design, and technology.
        </p>

        <div className="space-y-8">
          {/* Blog posts will go here */}
          <div className="border-l-4 border-accent pl-6 py-4">
            <h2 className="text-2xl font-semibold text-headline mb-2">Coming Soon</h2>
            <p className="text-paragraph">Blog posts will be added here soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
