import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../utils/blogUtils';
import BlogLayout from '../components/blog/BlogLayout';
import BlogPreview from '../components/blog/BlogPreview';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    };
    loadPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogPreview key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
