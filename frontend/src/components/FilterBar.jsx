import React from 'react';

export default function FilterBar({ sort, setSort, categories = [], category, setCategory }) {
  return (
    <div className="filter-bar">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Tất cả chuyên mục</option>
        {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
      </select>
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="latest">Mới nhất</option>
        <option value="popular">Xem nhiều</option>
        <option value="featured">Nổi bật</option>
      </select>
    </div>
  );
}
