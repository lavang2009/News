import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import SectionTitle from '../../components/SectionTitle';

const empty = { title: '', imageUrl: '', category: '', description: '' };

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const load = () => api.get('/admin/gallery').then((d) => setItems(d.items || []));
  useEffect(() => { load(); }, []);
  const submit = async (e) => { e.preventDefault(); await api.post('/admin/gallery', form); setForm(empty); load(); };
  return (
    <div>
      <SectionTitle eyebrow="Admin" title="Thư viện ảnh" />
      <form className="form-grid panel" onSubmit={submit}>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Tiêu đề" />
        <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="Ảnh URL" />
        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Chủ đề" />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Mô tả" />
        <button className="btn btn-primary">Lưu ảnh</button>
      </form>
      <div className="table-wrap">
        <table className="admin-table"><thead><tr><th>Tiêu đề</th><th>Chủ đề</th></tr></thead><tbody>{items.map((i) => <tr key={i.id}><td>{i.title}</td><td>{i.category}</td></tr>)}</tbody></table>
      </div>
    </div>
  );
}
