import React from 'react';
import { Link } from 'react-router-dom';
import { socialLinks } from '../data/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h3>H’Mông Việt News</h3>
          <p>Website tin tức hiện đại về văn hóa, đời sống và du lịch của người H’Mông Việt Nam.</p>
        </div>
        <div>
          <h4>Liên kết</h4>
          <div className="footer-links">
            <Link to="/about">Giới thiệu</Link>
            <Link to="/contact">Liên hệ</Link>
            <Link to="/login">Đăng nhập</Link>
            <Link to="/register">Đăng ký</Link>
          </div>
        </div>
        <div>
          <h4>Mạng xã hội</h4>
          <div className="footer-links">
            {socialLinks.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 H’Mông Việt News.</span>
        <div>
          <Link to="/privacy">Chính sách bảo mật</Link>
          <Link to="/terms">Điều khoản sử dụng</Link>
        </div>
      </div>
    </footer>
  );
}
