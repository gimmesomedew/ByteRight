import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { getPostBySlug } from '../../utils/blogUtils';

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  xhtml: true
});

export default function BlogLayout() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const currentPost = await getPostBySlug(slug);
        setPost(currentPost);
      } catch (error) {
        console.error('Error loading post:', error);
      }
    };
    loadPost();
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-white rounded-xl shadow-lg overflow-hidden">
          {post.image && (
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className="w-full h-[400px] object-cover"
            />
          )}
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              {post.label && (
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {post.label}
                </span>
              )}
              <span className="text-gray-600 text-sm">
                {post.published}
              </span>
              {post.author && (
                <span className="text-gray-600 text-sm">
                  by {post.author}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              {post.title}
            </h1>
            <div
              className="prose lg:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{
                __html: marked(post.content || '')
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
