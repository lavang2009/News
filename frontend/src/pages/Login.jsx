import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, googleLogin, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@hmongvietnews.vn', password: 'Admin@123456' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await login(form);
      navigate('/profile');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setMessage('');
    try {
      await googleLogin();
      navigate('/profile');
    } catch (error) {
      setMessage(error.message || 'Không thể đăng nhập bằng Google.');
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    try {
      await resetPassword(form.email);
      setMessage('Đã gửi liên kết đặt lại mật khẩu vào email của bạn.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="auth-page">
      <Helmet><title>Đăng nhập | H’Mông Việt News</title></Helmet>
      <form className="auth-card panel" onSubmit={submit}>
        <p className="eyebrow">Đăng nhập</p>
        <h1>Chào mừng trở lại</h1>
        <p className="muted">Đăng nhập để bình luận, lưu bài viết, quản lý hồ sơ và truy cập trang cá nhân.</p>

        <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email" required />
        <input name="password" type="password" value={form.password} onChange={handle} placeholder="Mật khẩu" required />

        <button className="btn btn-primary" disabled={loading}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>

        <div className="auth-divider"><span>hoặc</span></div>

        <button type="button" className="btn btn-outline btn-google" onClick={signInWithGoogle} disabled={loading}>
          Đăng nhập bằng Google
        </button>

        <div className="auth-links">
          <button type="button" className="text-btn" onClick={forgotPassword}>Quên mật khẩu?</button>
          <Link to="/register">Tạo tài khoản</Link>
        </div>

        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}
