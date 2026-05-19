import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import SectionTitle from '../../components/SectionTitle';

const empty = { title: '', excerpt: '', content: '', coverImage: '', categoryId: 1, authorId: 1, videoUrl: '', featured: false, status: 'published', tagIds: '' };

export default function AdminPosts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  const load = () => api.get('/admin/posts').then((d) => setItems(d.items || []));
  useEffect(() => { load(); }, []);

  const handle = (e) => setForm((c) => ({ ...c, [e.target.name]: e.target.name === 'featured' ? e.target.checked : e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/admin/posts', { ...form, tagIds: form.tagIds.split(',').map((v) => Number(v.trim())).filter(Boolean), id: editing?.id });
    setMessage('Đã lưu bài viết.');
    setForm(empty);
    setEditing(null);
    load();
  };

  const edit = (item) => { setEditing(item); setForm({ ...item, tagIds: (item.tagIds || []).join(',') }); };

  const remove = async (id) => { if (confirm('Xóa bài viết?')) { await api.del(`/admin/posts/${id}`); load(); } };

  return (
    <div>
      <SectionTitle eyebrow="Admin" title="Quản lý bài viết" />
      <form className="form-grid panel" onSubmit={submit}>
        <input name="title" value={form.title} onChange={handle} placeholder="Tiêu đề" required />
        <input name="excerpt" value={form.excerpt} onChange={handle} placeholder="Mô tả ngắn" required />
        <input name="coverImage" value={form.coverImage} onChange={handle} placeholder="Ảnh bìa" />
        <input name="categoryId" value={form.categoryId} onChange={handle} placeholder="Category ID" />
        <input name="authorId" value={form.authorId} onChange={handle} placeholder="Author ID" />
        <input name="videoUrl" value={form.videoUrl} onChange={handle} placeholder="Video URL" />
        <input name="tagIds" value={form.tagIds} onChange={handle} placeholder="Tag IDs, cách nhau bởi dấu phẩy" />
        <textarea name="content" rows="8" value={form.content} onChange={handle} placeholder="Nội dung HTML" required />
        <label className="checkline"><input type="checkbox" name="featured" checked={form.featured} onChange={handle} /> Nổi bật</label>
        <button className="btn btn-primary">{editing ? 'Cập nhật' : 'Tạo mới'}</button>
      </form>
      {message && <p className="form-message">{message}</p>}
      <div className="table-wrap">
        <table className="admin-table">
          <thead><tr><th>Tiêu đề</th><th>Danh mục</th><th>Views</th><th>Likes</th><th /></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td><td>{item.category?.name}</td><td>{item.views}</td><td>{item.likes}</td>
                <td className="actions"><button onClick={() => edit(item)}>Sửa</button><button onClick={() => remove(item.id)}>Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
