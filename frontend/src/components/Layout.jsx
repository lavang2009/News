import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import { api } from '../api/client';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { buildTitle, metaDescription } from '../utils/seo';

export default function Layout({ children }) {
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    api.get('/categories').then((data) => setCategories(data.items || [])).catch(() => setCategories([]));
  }, []);

  return (
    <div className="app-shell">
      <Helmet>
        <title>{buildTitle('')}</title>
        <meta name="description" content={metaDescription} />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Helmet>
      <Header categories={categories} />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
      <div className="route-hint" aria-hidden="true">{location.pathname}</div>
    </div>
  );
}
