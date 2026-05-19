import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import SectionTitle from '../../components/SectionTitle';

export default function AdminContacts() {
  const [items, setItems] = useState([]);
  const load = () => api.get('/admin/contacts').then((d) => setItems(d.items || []));
  useEffect(() => { load(); }, []);
  const remove = async (id) => { await api.del(`/admin/contacts/${id}`); load(); };
  return (
    <div>
      <SectionTitle eyebrow="Admin" title="Liên hệ khách gửi" />
      <div className="table-wrap">
        <table className="admin-table">
          <thead><tr><th>Tên</th><th>Email</th><th>Nội dung</th><th /></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td><td>{item.email}</td><td>{item.message}</td>
                <td className="actions"><button onClick={() => remove(item.id)}>Xóa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
