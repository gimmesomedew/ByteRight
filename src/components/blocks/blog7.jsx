import React from "react";

export function Blog7({
  tagline,
  heading,
  description,
  buttonText,
  buttonUrl,
  posts = []
}) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="text-sm font-semibold uppercase tracking-wide text-red-500">
              {tagline}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
              {heading}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group relative flex flex-col space-y-4"
            >
              <img
                src={post.image}
                alt={post.title}
                className="rounded-lg object-cover w-full aspect-[4/3]"
                loading="lazy"
              />
              <div className="flex flex-col space-y-2">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-red-500">
                    {post.label}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                  <p className="text-gray-500">
                    {post.summary}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.published}</span>
                </div>
              </div>
              <a href={post.url} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </a>
            </article>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <a
            href={buttonUrl}
            className="inline-flex h-10 items-center rounded-md bg-red-600 px-8 text-sm font-medium text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-700"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
