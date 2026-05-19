import React, { useState } from 'react';

export default function CommentForm({ onSubmit, loading = false }) {
  const [form, setForm] = useState({ name: '', content: '', honeypot: '' });

  const handle = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <form className="comment-form" onSubmit={submit}>
      <div className="grid-2">
        <input name="name" placeholder="Tên của bạn" value={form.name} onChange={handle} required />
        <input name="honeypot" value={form.honeypot} onChange={handle} className="sr-only" tabIndex="-1" autoComplete="off" />
      </div>
      <textarea name="content" placeholder="Viết bình luận..." rows="4" value={form.content} onChange={handle} required />
      <button className="btn btn-primary" disabled={loading}>{loading ? 'Đang gửi...' : 'Gửi bình luận'}</button>
    </form>
  );
}
