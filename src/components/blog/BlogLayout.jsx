import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { getAllPosts } from '../../utils/blogUtils';

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
      const posts = await getAllPosts();
      const currentPost = posts.find((p) => p.slug === slug);
      setPost(currentPost);
    };
    loadPost();
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-8">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{
          __html: marked(post.content || '')
        }}
      />
    </article>
  );
}
