import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../components/SectionTitle';
import { api } from '../api/client';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [message, setMessage] = useState('');

  const handle = (e) => setForm((current) => ({ ...current, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/contact', form);
      setMessage(res.message || 'Đã gửi liên hệ.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="page contact-grid">
      <Helmet><title>Liên hệ | H’Mông Việt News</title></Helmet>
      <div>
        <SectionTitle eyebrow="Liên hệ" title="Gửi thông tin cho chúng tôi" subtitle="Form liên hệ hoạt động thật, có thể kết nối với đội ngũ biên tập." />
        <form className="contact-form" onSubmit={submit}>
          <input name="name" value={form.name} onChange={handle} placeholder="Họ và tên" required />
          <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email" required />
          <input name="phone" value={form.phone} onChange={handle} placeholder="Số điện thoại" />
          <textarea name="message" value={form.message} onChange={handle} placeholder="Nội dung liên hệ" rows="6" required />
          <button className="btn btn-primary">Gửi liên hệ</button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>
      <aside className="contact-card">
        <h3>Thông tin liên hệ</h3>
        <p>Email: contact@hmongvietnews.vn</p>
        <p>Điện thoại: 0900 000 000</p>
        <p>Mạng xã hội: Facebook, Zalo, YouTube, TikTok</p>
        <div className="map-box">
          <iframe title="Google Maps" src="https://www.google.com/maps?q=Hanoi&output=embed" loading="lazy" />
        </div>
      </aside>
    </section>
  );
}
