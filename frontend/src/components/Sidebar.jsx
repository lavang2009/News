import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ trending = [], ads = [], categories = [] }) {
  return (
    <aside className="sidebar">
      <section className="side-box">
        <h3>Tin xem nhiều</h3>
        <div className="side-list">
          {trending.slice(0, 5).map((item) => (
            <Link key={item.id} to={`/article/${item.slug}`} className="side-item">
              <img src={item.coverImage} alt={item.title} />
              <div>
                <strong>{item.title}</strong>
                <span>{item.views} lượt xem</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="side-box">
        <h3>Chủ đề hot</h3>
        <div className="topic-cloud">
          {categories.slice(0, 8).map((cat) => <Link key={cat.id} to={`/category/${cat.slug}`}>{cat.name}</Link>)}
        </div>
      </section>

      <section className="side-box">
        <h3>Quảng cáo</h3>
        {ads.map((ad) => (
          <a key={ad.id} href={ad.linkUrl || '#'} target="_blank" rel="noreferrer" className="ad-card">
            <img src={ad.imageUrl} alt={ad.title} />
            <span>{ad.title}</span>
          </a>
        ))}
      </section>
    </aside>
  );
}
