import React, { useState } from 'react';

export default function GalleryGrid({ items = [] }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => (
          <button key={item.id} className="gallery-item" onClick={() => setActive(item)}>
            <img src={item.imageUrl} alt={item.title} loading="lazy" />
            <div className="gallery-caption">
              <strong>{item.title}</strong>
              <span>{item.category}</span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div className="lightbox" onClick={() => setActive(null)}>
          <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
            <img src={active.imageUrl} alt={active.title} />
            <div>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
            </div>
            <button className="btn btn-outline" onClick={() => setActive(null)}>Đóng</button>
          </div>
        </div>
      )}
    </>
  );
}
