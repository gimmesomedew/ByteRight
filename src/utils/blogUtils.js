// Import blog posts directly
import welcomePost from '../../content/blog/2025-05-08-welcome-to-byteright.md?raw';
import securityPost from '../../content/blog/2025-05-08-7-essential-security-measures-that-improve-your-woocommerce-customer-experience.md?raw';

// Simple frontmatter parser
function parseFrontmatter(content) {
  const lines = content.split('\n');
  const frontmatter = {};
  let isInFrontmatter = false;
  let markdown = '';
  let frontmatterLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '---') {
      if (!isInFrontmatter) {
        isInFrontmatter = true;
        continue;
      } else {
        isInFrontmatter = false;
        markdown = lines.slice(i + 1).join('\n');
        break;
      }
    }
    if (isInFrontmatter) {
      frontmatterLines.push(line);
    }
  }

  // Parse frontmatter lines
  frontmatterLines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      frontmatter[key.trim()] = value;
    }
  });

  return { data: frontmatter, content: markdown };
}

const blogPosts = [
  {
    content: welcomePost,
    path: '2025-05-08-welcome-to-byteright.md',
    slug: 'welcome-to-byteright'
  },
  {
    content: securityPost,
    path: '2025-05-08-7-essential-security-measures-that-improve-your-woocommerce-customer-experience.md',
    slug: '7-essential-security-measures-that-improve-your-woocommerce-customer-experience'
  }
];

export async function getAllPosts({ page = 1, limit = 10, category = null } = {}) {
  try {
    console.log('Loading blog posts...');
    const posts = [];

    for (const { content, path, slug } of blogPosts) {
      try {
        // Parse frontmatter
        const { data: frontmatter, content: markdown } = parseFrontmatter(content);

        // Create post object
        const post = {
          id: slug,
          slug,
          title: frontmatter.title || 'Untitled',
          description: frontmatter.description || '',
          category: frontmatter.category || 'Article',
          author: frontmatter.author || 'ByteRight Team',
          formattedDate: frontmatter.date ? new Date(frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'No date',
          url: `/blog/${slug}`,
          image: frontmatter.thumbnail || 'https://placehold.co/600x400?text=ByteRight',
          date: frontmatter.date ? new Date(frontmatter.date) : new Date(0),
          readingTime: Math.max(1, Math.ceil(markdown.split(/\s+/).length / 200))
        };

        posts.push(post);
      } catch (err) {
        console.error(`Error processing ${path}:`, err);
        console.error('Error details:', err.message);
      }
    }

    // Filter by category if specified
    let filteredPosts = category 
      ? posts.filter(post => post.category === category)
      : posts;

    // Sort by date (newest first)
    filteredPosts = filteredPosts.sort((a, b) => b.date - a.date);

    // Calculate pagination
    const total = filteredPosts.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedPosts = filteredPosts.slice(offset, offset + limit);

    return {
      posts: paginatedPosts,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  } catch (error) {
    console.error('Error in getAllPosts:', error);
    console.error('Error details:', error.message);
    return {
      posts: [],
      pagination: {
        total: 0,
        page: 1,
        limit,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  }
}

export async function getPostBySlug(slug) {
  try {
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) {
      throw new Error(`Post not found: ${slug}`);
    }

    const { data: frontmatter, content: markdown } = parseFrontmatter(post.content);

    return {
      ...frontmatter,
      content: markdown,
      slug,
      formattedDate: frontmatter.date ? new Date(frontmatter.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : 'No date',
      readingTime: Math.max(1, Math.ceil(markdown.split(/\s+/).length / 200))
    };
  } catch (error) {
    console.error(`Error in getPostBySlug(${slug}):`, error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const categories = new Set();

    for (const { content } of blogPosts) {
      try {
        const { data: frontmatter } = parseFrontmatter(content);
        if (frontmatter.category) {
          categories.add(frontmatter.category);
        }
      } catch (err) {
        console.error('Error extracting category:', err);
      }
    }

    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
}
