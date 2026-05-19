import React from 'react';

export function PostSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton media" />
      <div className="skeleton line" />
      <div className="skeleton line short" />
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid cards-grid">
      {Array.from({ length: count }).map((_, i) => <PostSkeleton key={i} />)}
    </div>
  );
}
