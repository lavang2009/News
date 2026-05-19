import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryPills({ categories = [] }) {
  return (
    <div className="pills">
      {categories.map((item) => (
        <Link key={item.slug} to={`/category/${item.slug}`} className="pill">
          {item.name}
        </Link>
      ))}
    </div>
  );
}
