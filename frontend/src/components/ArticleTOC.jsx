import React from 'react';

export default function ArticleTOC({ content = '' }) {
  const headings = [...content.matchAll(/<h2[^>]*id="([^"]+)"[^>]*>(.*?)<\/h2>/gi)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]*>/g, '')
  }));
  if (!headings.length) return null;
  return (
    <aside className="toc">
      <h4>Mục lục</h4>
      {headings.map((item) => <a key={item.id} href={`#${item.id}`}>{item.text}</a>)}
    </aside>
  );
}
