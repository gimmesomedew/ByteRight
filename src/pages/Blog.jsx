import React, { useEffect, useState } from "react";
import { Blog7 } from "../components/blocks/Blog7";
import { getAllPosts, getCategories } from "../utils/blogUtils";
import { useSearchParams } from "react-router-dom";

const blogConfig = {
  tagline: "Latest Updates",
  heading: "ByteRight Blog",
  description:
    "Stay up to date with the latest web development trends, WordPress tips, and digital transformation strategies.",
  buttonText: "View All Posts",
  buttonUrl: "#",
};

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  // Get current page and category from URL params
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentCategory = searchParams.get("category") || null;

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const allCategories = await getCategories();
        setCategories(allCategories);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };

    loadCategories();
  }, []);

  // Load posts with pagination and filtering
  useEffect(() => {
    let mounted = true;

    const loadPosts = async () => {
      try {
        setLoading(true);
        console.log('Loading posts...', { page: currentPage, category: currentCategory });
        
        const result = await getAllPosts({
          page: currentPage,
          limit: POSTS_PER_PAGE,
          category: currentCategory
        });

        if (mounted) {
          if (!result.posts || result.posts.length === 0) {
            setError('No blog posts found');
          } else {
            setPosts(result.posts);
            setPagination(result.pagination);
            setError(null);
          }
        }
      } catch (err) {
        console.error('Error loading posts:', err);
        if (mounted) {
          setError(err.message || 'Failed to load blog posts');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      mounted = false;
    };
  }, [currentPage, currentCategory]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSearchParams(params => {
      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }
      params.set("page", "1");
      return params;
    });
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setSearchParams(params => {
      params.set("page", newPage.toString());
      return params;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Blog Posts */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <Blog7 {...blogConfig} posts={posts} />

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-12 border-t border-gray-100 pt-8">
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className={`px-6 py-2 rounded-md flex items-center gap-2 ${pagination.hasPrevPage
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700 font-medium">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className={`px-6 py-2 rounded-md flex items-center gap-2 ${pagination.hasNextPage
                    ? 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
