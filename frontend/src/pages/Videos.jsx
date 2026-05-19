import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../api/client';
import VideoCard from '../components/VideoCard';
import SectionTitle from '../components/SectionTitle';

export default function Videos() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/videos').then((d) => setItems(d.items || []));
  }, []);

  return (
    <section className="page">
      <Helmet><title>Video | H’Mông Việt News</title></Helmet>
      <SectionTitle eyebrow="Video" title="Không gian video văn hóa H’Mông" subtitle="Danh sách video nổi bật theo phong cách media hiện đại." />
      <div className="video-grid">
        {items.map((video) => <VideoCard key={video.id} video={video} />)}
      </div>
    </section>
  );
}
