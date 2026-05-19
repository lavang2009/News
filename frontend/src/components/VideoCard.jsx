import React from 'react';

export default function VideoCard({ video }) {
  return (
    <article className="video-card">
      <div className="video-frame">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div className="video-body">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>
    </article>
  );
}
