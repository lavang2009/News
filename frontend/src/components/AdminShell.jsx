import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const links = [
  ['/admin', 'Dashboard'],
  ['/admin/posts', 'Bài viết'],
  ['/admin/categories', 'Danh mục'],
  ['/admin/users', 'Người dùng'],
  ['/admin/videos', 'Video'],
  ['/admin/media', 'Upload media'],
  ['/admin/gallery', 'Thư viện ảnh'],
  ['/admin/banners', 'Banner'],
  ['/admin/ads', 'Quảng cáo'],
  ['/admin/comments', 'Bình luận'],
  ['/admin/contacts', 'Liên hệ']
];

export default function AdminShell() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">H’Mông Admin</div>
        {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/admin'}>{label}</NavLink>)}
      </aside>
      <section className="admin-main">
        <Outlet />
      </section>
    </div>
  );
}
