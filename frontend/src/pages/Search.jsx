import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../api/client';
import PostCard from '../components/PostCard';
import SectionTitle from '../components/SectionTitle';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!q) return;
    api.get(`/search?q=${encodeURIComponent(q)}`).then((d) => setItems(d.items || []));
  }, [q]);

  return (
    <section className="page">
      <Helmet><title>Tìm kiếm | H’Mông Việt News</title></Helmet>
      <SectionTitle eyebrow="Tìm kiếm" title={`Kết quả cho: ${q}`} />
      <div className="grid cards-grid">
        {items.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
      {!items.length && <p className="muted">Không có kết quả phù hợp.</p>}
    </section>
  );
}
