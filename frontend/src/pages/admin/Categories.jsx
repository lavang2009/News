import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import SectionTitle from '../../components/SectionTitle';

export default function AdminCategories() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', id: null });

  const load = () => api.get('/admin/categories').then((d) => setItems(d.items || []));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/admin/categories', form);
    setForm({ name: '', description: '', id: null });
    load();
  };

  return (
    <div>
      <SectionTitle eyebrow="Admin" title="Quản lý danh mục" />
      <form className="form-grid panel" onSubmit={submit}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Tên danh mục" required />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Mô tả" />
        <button className="btn btn-primary">Lưu danh mục</button>
      </form>
      <div className="table-wrap">
        <table className="admin-table">
          <thead><tr><th>Tên</th><th>Slug</th></tr></thead>
          <tbody>{items.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.slug}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
