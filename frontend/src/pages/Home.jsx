import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../api/client';
import { mockHome } from '../data/mock';
import HeroSlider from '../components/HeroSlider';
import SectionTitle from '../components/SectionTitle';
import PostCard from '../components/PostCard';
import VideoCard from '../components/VideoCard';
import GalleryGrid from '../components/GalleryGrid';
import Sidebar from '../components/Sidebar';
import { GridSkeleton } from '../components/Skeleton';
import { categoryChips } from '../data/site';
import { formatNumber } from '../utils/format';

export default function Home() {
  const [data, setData] = useState({ featured: [], latest: [], trending: [], categories: [], banners: [], videos: [], gallery: [], ads: [], stats: { views: 0, posts: 0 } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/posts?sort=featured&featured=true&limit=4').catch(() => ({ items: mockHome.featured })),
      api.get('/posts?sort=latest&limit=8').catch(() => ({ items: mockHome.latest })),
      api.get('/posts/trending').catch(() => ({ items: mockHome.trending })),
      api.get('/categories').catch(() => ({ items: mockHome.categories })),
      api.get('/banners').catch(() => ({ items: mockHome.banners })),
      api.get('/videos').catch(() => ({ items: mockHome.videos })),
      api.get('/gallery').catch(() => ({ items: mockHome.gallery })),
      api.get('/ads').catch(() => ({ items: mockHome.ads })),
      api.get('/stats').catch(() => ({ views: 0, posts: 0 }))
    ]).then(([featured, latest, trending, categories, banners, videos, gallery, ads, stats]) => {
      setData({
        featured: featured.items || [],
        latest: latest.items || [],
        trending: trending.items || [],
        categories: categories.items || [],
        banners: banners.items || [],
        videos: videos.items || [],
        gallery: gallery.items || [],
        ads: ads.items || [],
        stats
      });
    }).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>H’Mông Việt News</title>
      </Helmet>

      <section className="page">
        <HeroSlider banners={data.banners} posts={data.featured} />
      </section>

      <section className="page grid-home">
        <div className="main-column">
          <SectionTitle
            eyebrow="Chuyên mục"
            title="Khám phá bản sắc H’Mông"
            subtitle="Tin tức, văn hóa, lễ hội, ẩm thực và câu chuyện vùng cao."
          />
          <div className="stats-row">
            <div className="stat-card"><span>Bài viết</span><strong>{formatNumber(data.stats.posts)}</strong><small>Nội dung đã xuất bản</small></div>
            <div className="stat-card"><span>Lượt xem</span><strong>{formatNumber(data.stats.views)}</strong><small>Tổng truy cập bài viết</small></div>
          </div>
          <div className="pills">
            {categoryChips.map((item) => <Link key={item} className="pill" to="/category/van-hoa-hmong">{item}</Link>)}
          </div>

          <SectionTitle eyebrow="Tin nổi bật" title="Bài viết dẫn đầu" />
          {loading ? <GridSkeleton count={4} /> : (
            <div className="grid cards-grid">
              {data.featured.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          )}

          <SectionTitle eyebrow="Tin mới nhất" title="Cập nhật gần đây" />
          {loading ? <GridSkeleton count={6} /> : (
            <div className="grid cards-grid">
              {data.latest.map((post) => <PostCard key={post.id} post={post} compact />)}
            </div>
          )}

          <SectionTitle eyebrow="Video" title="Không gian media" />
          <div className="video-grid">
            {data.videos.slice(0, 2).map((video) => <VideoCard key={video.id} video={video} />)}
          </div>

          <SectionTitle eyebrow="Thư viện ảnh" title="Bộ sưu tập hình ảnh" />
          <GalleryGrid items={data.gallery} />
        </div>

        <Sidebar trending={data.trending} ads={data.ads} categories={data.categories} />
      </section>
    </>
  );
}
