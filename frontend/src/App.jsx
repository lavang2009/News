import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminShell from './components/AdminShell';

import Home from './pages/Home';
import Article from './pages/Article';
import CategoryPage from './pages/Category';
import Videos from './pages/Videos';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import Dashboard from './pages/admin/Dashboard';
import AdminPosts from './pages/admin/Posts';
import AdminCategories from './pages/admin/Categories';
import AdminUsers from './pages/admin/Users';
import AdminVideos from './pages/admin/Videos';
import AdminMedia from './pages/admin/Media';
import AdminGallery from './pages/admin/Gallery';
import AdminBanners from './pages/admin/Banners';
import AdminAds from './pages/admin/Ads';
import AdminComments from './pages/admin/Comments';
import AdminContacts from './pages/admin/Contacts';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/admin" element={<ProtectedRoute roles={['admin','editor']}><AdminShell /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="videos" element={<AdminVideos />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="ads" element={<AdminAds />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
