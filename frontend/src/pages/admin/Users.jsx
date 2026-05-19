import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';
import SectionTitle from '../../components/SectionTitle';

export default function AdminUsers() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get('/admin/users').then((d) => setItems(d.items || [])); }, []);
  return (
    <div>
      <SectionTitle eyebrow="Admin" title="Quản lý người dùng" />
      <div className="table-wrap">
        <table className="admin-table">
          <thead><tr><th>Tên</th><th>Email</th><th>Vai trò</th></tr></thead>
          <tbody>{items.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.email}</td><td>{item.role}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
