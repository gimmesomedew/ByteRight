import React, { useEffect, useState } from "react";
import { Blog7 } from "@/components/blocks/Blog7";
import { getAllPosts } from "@/utils/blogUtils";

const blogConfig = {
  tagline: "Latest Updates",
  heading: "ByteRight Blog",
  description:
    "Stay up to date with the latest web development trends, WordPress tips, and digital transformation strategies.",
  buttonText: "View All Posts",
  buttonUrl: "#",
};

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadPosts = async () => {
      try {
        console.log('Starting to load posts...');
        const allPosts = await getAllPosts();
        console.log('Loaded posts:', allPosts);
        
        if (mounted) {
          if (allPosts.length === 0) {
            console.log('No posts were found');
          }
          setPosts(allPosts);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading posts:', err);
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading blog posts: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Blog7 {...blogConfig} posts={posts} />
    </div>
  );
}
