import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import SectionTitle from '../../components/SectionTitle';

export default function AdminComments() {
  const [items, setItems] = useState([]);
  const load = () => api.get('/admin/comments').then((d) => setItems(d.items || []));
  useEffect(() => { load(); }, []);
  const approve = async (id) => { await api.patch(`/admin/comments/${id}/approve`); load(); };
  const remove = async (id) => { await api.del(`/admin/comments/${id}`); load(); };
  return (
    <div>
      <SectionTitle eyebrow="Admin" title="Quản lý bình luận" />
      <div className="table-wrap">
        <table className="admin-table">
          <thead><tr><th>Người gửi</th><th>Nội dung</th><th /></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.content}</td>
                <td className="actions"><button onClick={() => approve(item.id)}>Duyệt</button><button onClick={() => remove(item.id)}>Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
