import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import SectionTitle from '../../components/SectionTitle';
import StatCard from '../../components/StatCard';

export default function Dashboard() {
  const [data, setData] = useState({ stats: {}, latestPosts: [] });
  useEffect(() => { api.get('/admin/dashboard').then(setData); }, []);
  const s = data.stats || {};
  return (
    <div>
      <SectionTitle eyebrow="Admin" title="Dashboard thống kê" />
      <div className="stats-row">
        <StatCard label="Bài viết" value={s.posts || 0} />
        <StatCard label="Danh mục" value={s.categories || 0} />
        <StatCard label="Người dùng" value={s.users || 0} />
        <StatCard label="Bình luận" value={s.comments || 0} />
      </div>
      <div className="stats-row">
        <StatCard label="Lượt xem" value={s.views || 0} />
        <StatCard label="Lượt thích" value={s.likes || 0} />
      </div>
      <div className="panel">
        <h3>Bài viết gần đây</h3>
        <ul className="bullet-list">
          {data.latestPosts?.map((post) => <li key={post.id}>{post.title}</li>)}
        </ul>
      </div>
    </div>
  );
}
