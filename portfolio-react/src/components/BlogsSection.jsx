import { useState, useEffect } from 'react';
import { blogStorage } from '../utils/blogStorage';
import BlogManager from './BlogManager';
import './BlogsSection.css';

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    const allBlogs = blogStorage.getBlogs();
    setBlogs(allBlogs);
  };

  const handleAddNew = () => {
    setEditingBlog(null);
    setIsManagerOpen(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setIsManagerOpen(true);
  };

  const handleDelete = (blog) => {
    if (confirm(`Delete "${blog.title}"?`)) {
      blogStorage.deleteBlog(blog.id);
      loadBlogs();
    }
  };

  const handleManagerClose = () => {
    setIsManagerOpen(false);
    setEditingBlog(null);
    loadBlogs();
  };

  const handleReadBlog = (blog) => {
    blogStorage.incrementViews(blog.id);
    setSelectedBlog(blog);
    loadBlogs();
  };

  const handleCloseBlogView = () => {
    setSelectedBlog(null);
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = !searchQuery ||
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = !filterTag || blog.tags.includes(filterTag);

    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

  if (selectedBlog) {
    return <BlogViewer blog={selectedBlog} onClose={handleCloseBlogView} />;
  }

  return (
    <>
      <section id="blogs" className="blogs terminal-section">
        <div className="container">
          <div className="section-header">
            <h2 className="terminal-section-title">
              <span className="prompt">$</span> cat ~/blogs/*.md
            </h2>
            <button className="add-blog-btn" onClick={handleAddNew}>
              <i className="fas fa-plus"></i> New Blog
            </button>
          </div>

          <div className="blog-controls">
            <div className="blog-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="blog-tags-filter">
              <button
                className={`tag-filter-btn ${!filterTag ? 'active' : ''}`}
                onClick={() => setFilterTag('')}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`tag-filter-btn ${filterTag === tag ? 'active' : ''}`}
                  onClick={() => setFilterTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="blogs-grid">
            {filteredBlogs.length === 0 ? (
              <div className="no-blogs">
                <i className="fas fa-blog"></i>
                <p>No blogs found. Create your first blog!</p>
                <button className="btn-create-first" onClick={handleAddNew}>
                  <i className="fas fa-plus"></i> Create Blog
                </button>
              </div>
            ) : (
              filteredBlogs.map(blog => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  onRead={handleReadBlog}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <BlogManager
        isOpen={isManagerOpen}
        onClose={handleManagerClose}
        editBlog={editingBlog}
      />
    </>
  );
};

const BlogCard = ({ blog, onRead, onEdit, onDelete }) => {
  return (
    <div className={`blog-card terminal-window glow-effect ${blog.featured ? 'featured' : ''}`}>
      {blog.featured && (
        <div className="featured-badge">
          <i className="fas fa-star"></i> Featured
        </div>
      )}

      <div className="blog-card-header">
        <span className="blog-hash">#{blog.id.slice(-6)}</span>
        <div className="blog-actions">
          <button
            className="blog-action-btn edit"
            onClick={() => onEdit(blog)}
            title="Edit"
          >
            <i className="fas fa-pen"></i>
          </button>
          <button
            className="blog-action-btn delete"
            onClick={() => onDelete(blog)}
            title="Delete"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      <h3 className="blog-card-title" onClick={() => onRead(blog)}>
        {blog.title}
      </h3>

      <p className="blog-card-excerpt">{blog.excerpt}</p>

      <div className="blog-card-meta">
        <span className="blog-meta-item">
          <i className="fas fa-calendar"></i> {blog.date}
        </span>
        <span className="blog-meta-item">
          <i className="fas fa-clock"></i> {blog.readTime} min read
        </span>
        <span className="blog-meta-item">
          <i className="fas fa-eye"></i> {blog.views} views
        </span>
      </div>

      <div className="blog-card-tags">
        {blog.tags.map((tag, i) => (
          <span key={i} className="blog-tag">{tag}</span>
        ))}
      </div>

      <button className="blog-read-btn" onClick={() => onRead(blog)}>
        <i className="fas fa-book-open"></i> Read Article
      </button>
    </div>
  );
};

const BlogViewer = ({ blog, onClose }) => {
  const renderMarkdown = (markdown) => {
    // Simple markdown rendering
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Inline code
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    return html;
  };

  return (
    <div className="blog-viewer">
      <button className="blog-viewer-close" onClick={onClose}>
        <i className="fas fa-arrow-left"></i> Back to Blogs
      </button>

      <article className="blog-viewer-content terminal-window glow-effect">
        {blog.featured && (
          <div className="blog-viewer-featured">
            <i className="fas fa-star"></i> Featured Article
          </div>
        )}

        <header className="blog-viewer-header">
          <h1 className="blog-viewer-title">{blog.title}</h1>
          <div className="blog-viewer-meta">
            <span>
              <i className="fas fa-user"></i> {blog.author}
            </span>
            <span>
              <i className="fas fa-calendar"></i> {blog.date}
            </span>
            <span>
              <i className="fas fa-clock"></i> {blog.readTime} min read
            </span>
            <span>
              <i className="fas fa-eye"></i> {blog.views} views
            </span>
          </div>
          <div className="blog-viewer-tags">
            {blog.tags.map((tag, i) => (
              <span key={i} className="blog-tag">{tag}</span>
            ))}
          </div>
        </header>

        <div
          className="blog-viewer-body"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }}
        />
      </article>
    </div>
  );
};

export default BlogsSection;
