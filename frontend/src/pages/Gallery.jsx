import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { api } from '../api/client';
import SectionTitle from '../components/SectionTitle';
import GalleryGrid from '../components/GalleryGrid';

export default function Gallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/gallery').then((d) => setItems(d.items || []));
  }, []);

  return (
    <section className="page">
      <Helmet><title>Thư viện ảnh | H’Mông Việt News</title></Helmet>
      <SectionTitle eyebrow="Thư viện ảnh" title="Gallery Masonry văn hóa vùng cao" subtitle="Xem ảnh ở chế độ lightbox, theo chủ đề và thiết kế hiện đại." />
      <GalleryGrid items={items} />
    </section>
  );
}
