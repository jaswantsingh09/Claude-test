import { useState, useEffect } from 'react';
import { blogStorage } from '../utils/blogStorage';
import './BlogManager.css';

const BlogManager = ({ isOpen, onClose, editBlog = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    readTime: 5,
    featured: false
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (editBlog) {
      setFormData({
        title: editBlog.title,
        excerpt: editBlog.excerpt,
        content: editBlog.content,
        tags: editBlog.tags.join(', '),
        readTime: editBlog.readTime,
        featured: editBlog.featured
      });
    }
  }, [editBlog]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const blogData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      readTime: parseInt(formData.readTime) || 5
    };

    if (editBlog) {
      blogStorage.updateBlog(editBlog.id, blogData);
    } else {
      blogStorage.addBlog(blogData);
    }

    setTimeout(() => {
      setIsSaving(false);
      handleClose();
    }, 500);
  };

  const handleClose = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      tags: '',
      readTime: 5,
      featured: false
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="blog-manager-overlay" onClick={handleClose}>
      <div className="blog-manager-modal" onClick={(e) => e.stopPropagation()}>
        <div className="blog-manager-header">
          <h2 className="blog-manager-title">
            <i className="fas fa-pen-to-square"></i>
            {editBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button className="blog-manager-close" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form className="blog-manager-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">
              <i className="fas fa-heading"></i> Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">
              <i className="fas fa-quote-left"></i> Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief description (shown in blog list)..."
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">
              <i className="fas fa-file-lines"></i> Content * (Markdown supported)
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content in Markdown...&#10;&#10;# Heading&#10;## Subheading&#10;&#10;**Bold** and *italic* text&#10;&#10;- List item 1&#10;- List item 2&#10;&#10;```code```"
              rows="15"
              required
            />
            <div className="form-hint">
              <i className="fas fa-circle-info"></i>
              Use Markdown for formatting: # Headers, **Bold**, *Italic*, - Lists, ```Code```
            </div>
          </div>

          <div className="form-row">
            <div className="form-group form-group-half">
              <label htmlFor="tags">
                <i className="fas fa-tags"></i> Tags (comma separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="React, JavaScript, AI, ..."
              />
            </div>

            <div className="form-group form-group-half">
              <label htmlFor="readTime">
                <i className="fas fa-clock"></i> Read Time (minutes)
              </label>
              <input
                type="number"
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                min="1"
                max="60"
              />
            </div>
          </div>

          <div className="form-group form-group-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <span className="checkbox-text">
                <i className="fas fa-star"></i> Mark as Featured
              </span>
            </label>
          </div>

          <div className="blog-manager-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleClose}
              disabled={isSaving}
            >
              <i className="fas fa-times"></i> Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-check"></i> {editBlog ? 'Update' : 'Create'} Blog
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogManager;
