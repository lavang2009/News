import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/client';
import PostCard from '../components/PostCard';
import { GridSkeleton } from '../components/Skeleton';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import SectionTitle from '../components/SectionTitle';

export default function CategoryPage() {
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [sort, setSort] = useState('latest');
  const [category, setCategory] = useState(slug || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.get('/categories').then((d) => setCategories(d.items || [])); }, []);

  useEffect(() => {
    setCategory(slug || '');
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    api.get(`/posts?category=${encodeURIComponent(category)}&sort=${sort}&page=${pagination.page}&limit=9`)
      .then((d) => {
        setItems(d.items || []);
        setPagination((p) => ({ ...p, ...d.pagination }));
      })
      .finally(() => setLoading(false));
  }, [category, sort, pagination.page]);

  const currentCategory = useMemo(() => categories.find((c) => c.slug === category), [categories, category]);

  return (
    <section className="page">
      <Helmet>
        <title>{currentCategory ? currentCategory.name : 'Chuyên mục'} | H’Mông Việt News</title>
      </Helmet>
      <SectionTitle
        eyebrow="Trang danh mục"
        title={currentCategory?.name || 'Tất cả bài viết'}
        subtitle={currentCategory?.description || 'Hiển thị bài viết theo chuyên mục, bộ lọc và sắp xếp linh hoạt.'}
      />
      <FilterBar sort={sort} setSort={setSort} categories={categories} category={category} setCategory={setCategory} />
      {loading ? <GridSkeleton count={6} /> : (
        <div className="grid cards-grid">
          {items.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      )}
      <Pagination page={pagination.page} totalPages={pagination.totalPages} onChange={(page) => setPagination((p) => ({ ...p, page }))} />
    </section>
  );
}
