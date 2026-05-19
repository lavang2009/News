import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import SectionTitle from '../components/SectionTitle';
import PostCard from '../components/PostCard';

export default function Profile() {
  const { user, bookmarks, reload } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '', avatar: user?.avatar || '' });
  const [pwd, setPwd] = useState({ currentPassword: '', newPassword: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setForm({ name: user?.name || '', bio: user?.bio || '', avatar: user?.avatar || '' });
  }, [user]);

  const handle = (e) => setForm((c) => ({ ...c, [e.target.name]: e.target.value }));
  const handlePwd = (e) => setPwd((c) => ({ ...c, [e.target.name]: e.target.value }));

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch('/auth/profile', form);
      setMessage('Đã cập nhật hồ sơ.');
      await reload();
      return res;
    } catch (error) {
      setMessage(error.message);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      await api.patch('/auth/password', pwd);
      setMessage('Đã đổi mật khẩu.');
      setPwd({ currentPassword: '', newPassword: '' });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="page profile-grid">
      <Helmet><title>Hồ sơ | H’Mông Việt News</title></Helmet>
      <div className="profile-card">
        <img src={user?.avatar || '/images/default-avatar.svg'} alt={user?.name} className="avatar" />
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
        <p>Vai trò: {user?.role}</p>
      </div>

      <div className="profile-panel">
        <SectionTitle eyebrow="Chỉnh sửa" title="Thông tin cá nhân" />
        <form className="form-grid" onSubmit={saveProfile}>
          <input name="name" value={form.name} onChange={handle} placeholder="Tên hiển thị" />
          <input name="avatar" value={form.avatar} onChange={handle} placeholder="Link avatar" />
          <textarea name="bio" rows="4" value={form.bio} onChange={handle} placeholder="Giới thiệu ngắn" />
          <button className="btn btn-primary">Lưu thay đổi</button>
        </form>
        <SectionTitle eyebrow="Bảo mật" title="Đổi mật khẩu" />
        <form className="form-grid" onSubmit={changePassword}>
          <input name="currentPassword" type="password" value={pwd.currentPassword} onChange={handlePwd} placeholder="Mật khẩu hiện tại" />
          <input name="newPassword" type="password" value={pwd.newPassword} onChange={handlePwd} placeholder="Mật khẩu mới" />
          <button className="btn btn-primary">Đổi mật khẩu</button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>

      <div className="profile-panel full">
        <SectionTitle eyebrow="Lưu lại" title="Bài viết yêu thích" />
        <div className="grid cards-grid">
          {bookmarks.map((post) => <PostCard key={post.id} post={post} compact />)}
        </div>
      </div>
    </section>
  );
}
