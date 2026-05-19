import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatNumber, readingTime } from '../utils/format';

export default function PostCard({ post, compact = false }) {
  if (!post) return null;
  const category = post.category?.slug || 'van-hoa-hmong';
  return (
    <article className={`post-card ${compact ? 'compact' : ''}`}>
      <Link to={`/article/${post.slug}`} className="post-thumb">
        <img src={post.coverImage} alt={post.title} loading="lazy" />
        {post.featured && <span className="badge">Nổi bật</span>}
      </Link>
      <div className="post-body">
        <div className="post-meta">
          <Link to={`/category/${category}`}>{post.category?.name || 'Chuyên mục'}</Link>
          <span>{formatDate(post.publishedAt)}</span>
          <span>{readingTime(post.content || post.excerpt)} phút đọc</span>
        </div>
        <h3>
          <Link to={`/article/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <div className="post-footer">
          <span>{post.author?.name || 'Biên tập'}</span>
          <div className="post-stats">
            <span>{formatNumber(post.views)} lượt xem</span>
            <span>{formatNumber(post.likes)} thích</span>
          </div>
        </div>
      </div>
    </article>
  );
}
