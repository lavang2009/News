import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client';
import { formatDate, formatNumber, readingTime } from '../utils/format';
import SectionTitle from '../components/SectionTitle';
import PostCard from '../components/PostCard';
import CommentForm from '../components/CommentForm';
import ArticleTOC from '../components/ArticleTOC';
import ShareButtons from '../components/ShareButtons';
import { useAuth } from '../context/AuthContext';

export default function Article() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    api.get(`/posts/${slug}`).then((d) => {
      setItem(d.item);
      setRelated(d.related || []);
      setLikes(d.item?.likes || 0);
      api.get(`/comments?postId=${d.item?.id}`).then((c) => setComments(c.items || []));
    });
  }, [slug]);

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = item?.title || 'Bài viết';

  const like = async () => {
    if (!item) return;
    const res = await api.post(`/posts/${item.id}/like`);
    setLikes(res.likes);
  };

  const bookmark = async () => {
    if (!item) return;
    if (!user) {
      setMessage('Vui lòng đăng nhập để lưu bài viết.');
      return;
    }
    await api.post(`/posts/${item.id}/bookmark`);
    setMessage('Đã lưu bài viết vào hồ sơ của bạn.');
  };

  const submitComment = async (payload) => {
    if (!item) return;
    try {
      await api.post('/comments', { ...payload, postId: item.id });
      const refreshed = await api.get(`/comments?postId=${item.id}`);
      setComments(refreshed.items || []);
      setMessage('Bình luận đã được gửi.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const reading = useMemo(() => readingTime(item?.content || ''), [item]);

  if (!item) return <section className="page"><div className="page-loading">Đang tải bài viết...</div></section>;

  return (
    <section className="page article-page">
      <Helmet>
        <title>{title} | H’Mông Việt News</title>
        <meta name="description" content={item.excerpt} />
      </Helmet>

      <article className="article">
        <img className="article-cover" src={item.coverImage} alt={item.title} />
        <div className="article-header">
          <div className="article-meta">
            <Link to={`/category/${item.category?.slug}`}>{item.category?.name}</Link>
            <span>{formatDate(item.publishedAt)}</span>
            <span>{reading} phút đọc</span>
            <span>{formatNumber(item.views)} lượt xem</span>
          </div>
          <h1>{item.title}</h1>
          <p className="article-excerpt">{item.excerpt}</p>

          <div className="article-tools">
            <button className="btn btn-outline" onClick={like}>Thích {formatNumber(likes)}</button>
            <button className="btn btn-outline" onClick={bookmark}>Bookmark</button>
            <button className="btn btn-outline" onClick={() => window.print()}>In bài</button>
          </div>

          <ShareButtons url={pageUrl} title={title} />
        </div>

        <div className="article-layout">
          <ArticleTOC content={item.content} />
          <div className="article-content" dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>

        {item.videoUrl && (
          <div className="video-inline">
            <iframe src={item.videoUrl} title={item.title} allowFullScreen />
          </div>
        )}

        <SectionTitle eyebrow="Bình luận" title="Ý kiến bạn đọc" />
        <CommentForm onSubmit={submitComment} />
        {message && <p className="form-message">{message}</p>}
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <strong>{comment.name}</strong>
              <p>{comment.content}</p>
              <span>{formatDate(comment.createdAt)}</span>
            </div>
          ))}
        </div>

        <SectionTitle eyebrow="Liên quan" title="Bài viết cùng chuyên đề" />
        <div className="grid cards-grid">
          {related.map((post) => <PostCard key={post.id} post={post} compact />)}
        </div>
      </article>
    </section>
  );
}
