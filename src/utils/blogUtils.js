import matter from 'gray-matter';

export async function getAllPosts() {
  const context = import.meta.glob('/content/blog/*.md', { eager: true });
  
  const posts = Object.entries(context).map(([path, post]) => {
    const slug = path.replace('/content/blog/', '').replace('.md', '');
    const { data, content } = matter(post.default);
    
    return {
      slug,
      ...data,
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
