import matter from 'gray-matter';
import welcomePost from '../../content/blog/2025-05-08-welcome-to-byteright.md?raw';
import securityPost from '../../content/blog/2025-05-08-7-essential-security-measures-that-improve-your-woocommerce-customer-experience.md?raw';

export async function getAllPosts() {
  try {
    console.log('Starting to load blog posts...');
    
    const posts = [];
    const markdownFiles = [
      {
        content: welcomePost,
        path: '2025-05-08-welcome-to-byteright.md'
      },
      {
        content: securityPost,
        path: '2025-05-08-7-essential-security-measures-that-improve-your-woocommerce-customer-experience.md'
      }
    ];

    for (const file of markdownFiles) {
      try {
        console.log(`Processing ${file.path}`);
        const { data: frontmatter } = matter(file.content);
        console.log(`Frontmatter for ${file.path}:`, frontmatter);

        posts.push({
          id: file.path.replace('.md', ''),
          title: frontmatter.title || 'Untitled',
          summary: frontmatter.description || '',
          label: frontmatter.category || 'Article',
          author: frontmatter.author || 'ByteRight Team',
          published: frontmatter.date ? new Date(frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'No date',
          url: `/blog/${file.path.replace('.md', '')}`,
          image: frontmatter.thumbnail || 'https://placehold.co/600x400?text=ByteRight',
        });
      } catch (err) {
        console.error(`Error processing ${file.path}:`, err);
      }
    }

    console.log('Processed posts:', posts);

    if (posts.length === 0) {
      throw new Error('No blog posts found');
    }

    // Sort posts by date, newest first
    return posts.sort((a, b) => {
      const dateA = new Date(a.published);
      const dateB = new Date(b.published);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    throw error;
  }
}

export async function getPostBySlug(slug) {
  try {
    const markdownFiles = {
      '2025-05-08-welcome-to-byteright': welcomePost,
      '2025-05-08-7-essential-security-measures-that-improve-your-woocommerce-customer-experience': securityPost
    };

    const content = markdownFiles[slug];
    if (!content) {
      throw new Error('Post not found');
    }

    const { data: frontmatter, content: markdown } = matter(content);

    return {
      ...frontmatter,
      content: markdown,
      slug,
    };
  } catch (error) {
    console.error('Error in getPostBySlug:', error);
    throw error;
  }
}
