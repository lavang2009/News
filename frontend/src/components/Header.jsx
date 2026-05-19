import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { navItems } from '../data/site';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Header({ categories = [] }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => document.body.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const search = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="topbar">
        <span>Văn hóa H’Mông Việt Nam · Tin tức · Di sản · Du lịch vùng cao</span>
        <div className="top-actions">
          <button onClick={toggleTheme} className="text-btn">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
          {user ? (
            <>
              <Link to="/profile" className="text-btn">{user.name}</Link>
              <button onClick={logout} className="text-btn">Đăng xuất</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-btn">Đăng nhập</Link>
              <Link to="/register" className="text-btn">Đăng ký</Link>
            </>
          )}
        </div>
      </div>

      <div className="header-main">
        <Link to="/" className="brand">
          <span className="brand-mark">H’M</span>
          <span>
            <strong>H’Mông Việt News</strong>
            <small>Báo điện tử văn hóa vùng cao</small>
          </span>
        </Link>

        <button className="mobile-menu" onClick={() => setOpen((v) => !v)}>☰</button>

        <nav className={`main-nav ${open ? 'open' : ''}`}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <form className="search-form desktop-only" onSubmit={search}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm bài viết, video..." />
          <button>Tìm</button>
        </form>
      </div>

      <form className="search-form mobile-only" onSubmit={search}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm bài viết, video..." />
        <button>Tìm</button>
      </form>
    </header>
  );
}
