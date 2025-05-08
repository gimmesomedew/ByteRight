import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogPreview({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          {new Date(post.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700">{post.description}</p>
        <Link
          to={`/blog/${post.slug}`}
          className="inline-block mt-4 text-blue-600 hover:text-blue-800"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}
