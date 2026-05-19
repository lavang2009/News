import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await register(form);
      navigate('/profile');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGoogle = async () => {
    setLoading(true);
    setMessage('');
    try {
      await googleLogin();
      navigate('/profile');
    } catch (error) {
      setMessage(error.message || 'Không thể tiếp tục bằng Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <Helmet><title>Đăng ký | H’Mông Việt News</title></Helmet>
      <form className="auth-card panel" onSubmit={submit}>
        <p className="eyebrow">Đăng ký</p>
        <h1>Tạo tài khoản mới</h1>
        <p className="muted">Bắt đầu bình luận, lưu bài viết và đồng bộ hồ sơ cá nhân bằng Firebase Authentication.</p>

        <input name="name" value={form.name} onChange={handle} placeholder="Họ và tên" required />
        <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email" required />
        <input name="password" type="password" value={form.password} onChange={handle} placeholder="Mật khẩu từ 8 ký tự" required />

        <button className="btn btn-primary" disabled={loading}>{loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}</button>

        <div className="auth-divider"><span>hoặc</span></div>

        <button type="button" className="btn btn-outline btn-google" onClick={signUpWithGoogle} disabled={loading}>
          Tiếp tục với Google
        </button>

        <div className="auth-links">
          <span className="muted">Đã có tài khoản?</span>
          <Link to="/login">Đăng nhập</Link>
        </div>

        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}
