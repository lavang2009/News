import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import SectionTitle from '../../components/SectionTitle';

const empty = { title: '', youtubeId: '', description: '', categoryId: '', featured: false };

export default function AdminVideos() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const load = () => api.get('/admin/videos').then((d) => setItems(d.items || []));
  useEffect(() => { load(); }, []);
  const submit = async (e) => { e.preventDefault(); await api.post('/admin/videos', form); setForm(empty); load(); };
  return (
    <div>
      <SectionTitle eyebrow="Admin" title="Quản lý video" />
      <form className="form-grid panel" onSubmit={submit}>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Tiêu đề" />
        <input value={form.youtubeId} onChange={(e) => setForm({ ...form, youtubeId: e.target.value })} placeholder="YouTube ID" />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Mô tả" />
        <input value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} placeholder="Category ID" />
        <label className="checkline"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Nổi bật</label>
        <button className="btn btn-primary">Lưu video</button>
      </form>
      <div className="table-wrap">
        <table className="admin-table"><thead><tr><th>Tiêu đề</th><th>ID video</th></tr></thead><tbody>{items.map((i) => <tr key={i.id}><td>{i.title}</td><td>{i.youtubeId}</td></tr>)}</tbody></table>
      </div>
    </div>
  );
}
