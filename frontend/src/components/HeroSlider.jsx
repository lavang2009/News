import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSlider({ banners = [], posts = [] }) {
  const slides = useMemo(() => {
    if (banners.length) return banners;
    return posts.slice(0, 3).map((post) => ({
      id: post.id,
      title: post.title,
      subtitle: post.excerpt,
      imageUrl: post.coverImage,
      linkUrl: `/article/${post.slug}`
    }));
  }, [banners, posts]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[index] || {};

  return (
    <section className="hero">
      <div className="hero-media">
        <img src={slide.imageUrl || '/images/hero.svg'} alt={slide.title || 'H’Mông Việt News'} />
        <div className="hero-overlay" />
      </div>
      <div className="hero-content">
        <p className="eyebrow">H’Mông Việt News</p>
        <h1>{slide.title || 'Bản tin hiện đại về văn hóa H’Mông Việt Nam'}</h1>
        <p>{slide.subtitle || 'Khám phá di sản sống, lễ hội, ẩm thực, trang phục và những câu chuyện vùng cao.'}</p>
        <div className="hero-actions">
          <Link to={slide.linkUrl || '/'} className="btn btn-primary">Đọc ngay</Link>
          <Link to="/about" className="btn btn-outline">Tìm hiểu thêm</Link>
        </div>
        <div className="hero-dots">
          {slides.map((s, i) => <button key={s.id || i} className={i === index ? 'active' : ''} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`} />)}
        </div>
      </div>
    </section>
  );
}
