import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import SectionTitle from '../../components/SectionTitle';

const empty = { title: '', imageUrl: '', linkUrl: '', active: true };

export default function AdminAds() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const load = () => api.get('/admin/ads').then((d) => setItems(d.items || []));
  useEffect(() => { load(); }, []);
  const submit = async (e) => { e.preventDefault(); await api.post('/admin/ads', form); setForm(empty); load(); };
  return (
    <div>
      <SectionTitle eyebrow="Admin" title="Quản lý quảng cáo" />
      <form className="form-grid panel" onSubmit={submit}>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Tiêu đề" />
        <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="Ảnh URL" />
        <input value={form.linkUrl} onChange={(e) => setForm({ ...form, linkUrl: e.target.value })} placeholder="Link" />
        <label className="checkline"><input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> Kích hoạt</label>
        <button className="btn btn-primary">Lưu quảng cáo</button>
      </form>
      <div className="table-wrap">
        <table className="admin-table"><thead><tr><th>Tiêu đề</th><th>Active</th></tr></thead><tbody>{items.map((i) => <tr key={i.id}><td>{i.title}</td><td>{String(i.active)}</td></tr>)}</tbody></table>
      </div>
    </div>
  );
}
