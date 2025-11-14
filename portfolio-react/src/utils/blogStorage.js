// Blog Storage Utility - Client-side blog management with localStorage

const BLOGS_KEY = 'portfolio_blogs';

// Default sample blogs
const defaultBlogs = [
  {
    id: '1',
    title: 'Building RAG Systems with LangChain',
    slug: 'building-rag-systems-langchain',
    excerpt: 'A comprehensive guide to building production-ready Retrieval-Augmented Generation systems using LangChain and vector databases.',
    content: `# Building RAG Systems with LangChain

Retrieval-Augmented Generation (RAG) has revolutionized how we build AI applications. Here's what I learned building production RAG systems.

## Key Components

1. **Vector Database** - Store and retrieve embeddings efficiently
2. **Embedding Model** - Convert text to vectors
3. **LLM** - Generate responses based on retrieved context
4. **Orchestration** - LangChain ties it all together

## Best Practices

- Chunk your documents intelligently (500-1000 tokens)
- Use hybrid search (semantic + keyword)
- Implement reranking for better results
- Monitor and iterate on retrieval quality

## Results

Our RAG system achieved 95% accuracy and saved $100K+ in operational costs!`,
    author: 'Jaswant Singh',
    date: '2024-11-10',
    tags: ['GenAI', 'RAG', 'LangChain', 'Python'],
    readTime: 8,
    views: 1250,
    featured: true
  },
  {
    id: '2',
    title: 'Agentic AI: The Future of Automation',
    slug: 'agentic-ai-future-automation',
    excerpt: 'Exploring how autonomous AI agents are transforming business workflows and reducing manual effort by 70%.',
    content: `# Agentic AI: The Future of Automation

Multi-agent systems are changing how we think about automation. Here's my journey building an agentic AI platform.

## What are AI Agents?

AI agents are autonomous systems that can:
- Plan and execute tasks
- Make decisions based on context
- Collaborate with other agents
- Learn from feedback

## Architecture

\`\`\`
Orchestrator
  ├── Research Agent
  ├── Writer Agent
  ├── Reviewer Agent
  └── Publisher Agent
\`\`\`

## Impact

- 3 FTE reduction
- 10x faster workflows
- 95% accuracy rate

The future is autonomous!`,
    author: 'Jaswant Singh',
    date: '2024-11-05',
    tags: ['Agentic AI', 'Automation', 'CrewAI', 'Python'],
    readTime: 6,
    views: 890,
    featured: true
  },
  {
    id: '3',
    title: 'React Performance: From 3.2s to 1.1s',
    slug: 'react-performance-optimization',
    excerpt: 'How I achieved 65% performance improvement in a large-scale React application using modern optimization techniques.',
    content: `# React Performance: From 3.2s to 1.1s

Performance matters. Here's how I optimized a React app to load 65% faster.

## The Problem

- Initial load: 3.2s
- Large bundle size: 2.5MB
- Re-renders everywhere
- No code splitting

## Solutions Implemented

1. **Code Splitting**
   - React.lazy() for route-based splitting
   - Dynamic imports for heavy components

2. **Memoization**
   - React.memo for expensive components
   - useMemo for complex calculations
   - useCallback for stable references

3. **Bundle Optimization**
   - Tree shaking
   - Removed unused dependencies
   - Optimized images with next-gen formats

4. **Lazy Loading**
   - Intersection Observer for images
   - Virtualization for long lists

## Results

- Load time: 1.1s (65% improvement)
- Bundle size: 800KB (68% reduction)
- Lighthouse score: 98/100

Small changes, massive impact!`,
    author: 'Jaswant Singh',
    date: '2024-10-28',
    tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
    readTime: 10,
    views: 2100,
    featured: false
  }
];

export const blogStorage = {
  // Get all blogs
  getBlogs: () => {
    try {
      const stored = localStorage.getItem(BLOGS_KEY);
      if (!stored) {
        // Initialize with default blogs
        blogStorage.setBlogs(defaultBlogs);
        return defaultBlogs;
      }
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error reading blogs:', error);
      return defaultBlogs;
    }
  },

  // Get blog by ID
  getBlogById: (id) => {
    const blogs = blogStorage.getBlogs();
    return blogs.find(blog => blog.id === id);
  },

  // Get blog by slug
  getBlogBySlug: (slug) => {
    const blogs = blogStorage.getBlogs();
    return blogs.find(blog => blog.slug === slug);
  },

  // Get featured blogs
  getFeaturedBlogs: () => {
    const blogs = blogStorage.getBlogs();
    return blogs.filter(blog => blog.featured);
  },

  // Set all blogs
  setBlogs: (blogs) => {
    try {
      localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
      return true;
    } catch (error) {
      console.error('Error saving blogs:', error);
      return false;
    }
  },

  // Add new blog
  addBlog: (blog) => {
    const blogs = blogStorage.getBlogs();
    const newBlog = {
      ...blog,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      author: 'Jaswant Singh',
      views: 0,
      slug: blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    blogs.unshift(newBlog);
    return blogStorage.setBlogs(blogs) ? newBlog : null;
  },

  // Update blog
  updateBlog: (id, updates) => {
    const blogs = blogStorage.getBlogs();
    const index = blogs.findIndex(blog => blog.id === id);
    if (index === -1) return false;

    blogs[index] = { ...blogs[index], ...updates };
    return blogStorage.setBlogs(blogs);
  },

  // Delete blog
  deleteBlog: (id) => {
    const blogs = blogStorage.getBlogs();
    const filtered = blogs.filter(blog => blog.id !== id);
    return blogStorage.setBlogs(filtered);
  },

  // Increment views
  incrementViews: (id) => {
    const blogs = blogStorage.getBlogs();
    const blog = blogs.find(b => b.id === id);
    if (blog) {
      blog.views = (blog.views || 0) + 1;
      blogStorage.setBlogs(blogs);
    }
  },

  // Search blogs
  searchBlogs: (query) => {
    const blogs = blogStorage.getBlogs();
    const lowerQuery = query.toLowerCase();
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(lowerQuery) ||
      blog.excerpt.toLowerCase().includes(lowerQuery) ||
      blog.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  },

  // Get blogs by tag
  getBlogsByTag: (tag) => {
    const blogs = blogStorage.getBlogs();
    return blogs.filter(blog =>
      blog.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  },

  // Reset to defaults
  resetToDefaults: () => {
    blogStorage.setBlogs(defaultBlogs);
    return defaultBlogs;
  }
};
