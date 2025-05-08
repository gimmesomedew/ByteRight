import { Octokit } from '@octokit/rest';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { dirname } from 'path';

// Load environment variables
dotenv.config({ path: path.join(dirname(fileURLToPath(import.meta.url)), '../.env') });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'gimmesomedew';
const REPO_NAME = 'ByteRight';

async function ensureBlogDirectory() {
  try {
    await fs.access(BLOG_DIR);
  } catch {
    await fs.mkdir(BLOG_DIR, { recursive: true });
  }
}

async function syncBlogPosts() {
  if (!GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN environment variable must be set in .env file');
    process.exit(1);
  }

  try {
    console.log('🔄 Starting blog post sync...');
    
    // Initialize GitHub client
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    
    // Ensure blog directory exists
    await ensureBlogDirectory();
    console.log('�� Blog directory ready');

    // Get contents of content/blog directory
    const { data: contents } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'content/blog'
    });

    console.log(`📝 Found ${contents.length} files to sync`);

    // Download each markdown file
    for (const file of contents) {
      if (file.type === 'file' && file.name.endsWith('.md')) {
        const { data: fileData } = await octokit.repos.getContent({
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: file.path
        });

        const content = Buffer.from(fileData.content, 'base64').toString();
        const localPath = path.join(BLOG_DIR, file.name);
        
        await fs.writeFile(localPath, content, 'utf8');
        console.log(`✓ Downloaded: ${file.name}`);
      }
    }

    console.log('\n✨ Sync completed successfully!');
  } catch (error) {
    console.error('\n❌ Sync failed:', error.message);
    if (error.status === 404) {
      console.error('Make sure the repository and blog directory exist and are accessible');
    }
    process.exit(1);
  }
}

// Run the sync if this file is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncBlogPosts();
}
