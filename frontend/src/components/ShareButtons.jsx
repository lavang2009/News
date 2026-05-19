import React from 'react';

export default function ShareButtons({ url, title }) {
  const share = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    zalo: `https://zalo.me/share/url?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    tiktok: `https://www.tiktok.com/`,
  };

  return (
    <div className="share-buttons">
      <a href={share.facebook} target="_blank" rel="noreferrer">Facebook</a>
      <a href={share.zalo} target="_blank" rel="noreferrer">Zalo</a>
      <a href={share.tiktok} target="_blank" rel="noreferrer">TikTok</a>
    </div>
  );
}
