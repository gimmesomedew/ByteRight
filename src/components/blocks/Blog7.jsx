import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts found in this category.</p>
          </div>
        ) : (
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group relative flex flex-col space-y-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  {post.category && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-2 p-6">
                  <div className="space-y-3 flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 line-clamp-3">{post.description}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="font-medium">{post.author}</span>
                      <div className="flex items-center space-x-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{post.formattedDate}</span>
                      </div>
                    </div>
                    {post.readingTime && (
                      <div className="mt-2 text-sm text-gray-400">
                        {post.readingTime} min read
                      </div>
                    )}
                  </div>
                </div>
                <Link to={post.url} className="absolute inset-0">
                  <span className="sr-only">Read more about {post.title}</span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

Blog7.propTypes = {
  tagline: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonUrl: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      category: PropTypes.string,
      author: PropTypes.string.isRequired,
      formattedDate: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      readingTime: PropTypes.number,
    })
  ),
};
