import { loadDB, saveDB, nextId } from '../storage.js';
import { normalizePagination } from '../storage.js';

const enrichPost = (db, post) => {
  const category = db.categories.find((c) => c.id === post.categoryId) || null;
  const author = db.users.find((u) => u.id === post.authorId) || null;
  const tags = (post.tagIds || []).map((id) => db.tags.find((t) => t.id === id)).filter(Boolean);
  const comments = db.comments.filter((c) => c.postId === post.id && c.approved).map((c) => ({
    ...c,
    user: db.users.find((u) => u.id === c.userId) || null
  }));
  return {
    ...post,
    category,
    author: author ? { id: author.id, name: author.name, avatar: author.avatar, role: author.role } : null,
    tags,
    comments,
    relatedCount: db.posts.filter((p) => p.categoryId === post.categoryId && p.id !== post.id).length
  };
};

export const listCategories = (req, res) => {
  const db = loadDB();
  res.json({ items: db.categories });
};

export const listPosts = (req, res) => {
  const db = loadDB();
  const { category, q, sort = 'latest', featured, page = 1, limit = 9 } = req.query;
  let items = db.posts.filter((p) => p.status === 'published');

  if (category) {
    const cat = db.categories.find((c) => c.slug === category || String(c.id) === String(category));
    if (cat) items = items.filter((p) => p.categoryId === cat.id);
  }
  if (q) {
    const keyword = String(q).toLowerCase();
    items = items.filter((p) => `${p.title} ${p.excerpt} ${p.content}`.toLowerCase().includes(keyword));
  }
  if (featured === 'true') items = items.filter((p) => p.featured);

  items = items.sort((a, b) => {
    if (sort === 'popular') return b.views - a.views;
    if (sort === 'featured') return Number(b.featured) - Number(a.featured) || new Date(b.publishedAt) - new Date(a.publishedAt);
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  const pager = normalizePagination({ page, limit });
  const paged = items.slice(pager.offset, pager.offset + pager.limit).map((post) => enrichPost(db, post));
  res.json({
    items: paged,
    pagination: { page: pager.page, limit: pager.limit, total: items.length, totalPages: Math.max(1, Math.ceil(items.length / pager.limit)) }
  });
};

export const getPostBySlug = (req, res) => {
  const db = loadDB();
  const post = db.posts.find((p) => p.slug === req.params.slug && p.status === 'published');
  if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết.' });
  post.views += 1;
  saveDB(db);

  const enriched = enrichPost(db, post);
  const related = db.posts
    .filter((p) => p.status === 'published' && p.id !== post.id && p.categoryId === post.categoryId)
    .sort((a, b) => b.views - a.views)
    .slice(0, 4)
    .map((p) => enrichPost(db, p));

  res.json({ item: enriched, related });
};

export const listTrending = (req, res) => {
  const db = loadDB();
  const items = db.posts
    .filter((p) => p.status === 'published')
    .sort((a, b) => (b.views + b.likes * 2) - (a.views + a.likes * 2))
    .slice(0, 7)
    .map((post) => enrichPost(db, post));
  res.json({ items });
};

export const listFeatured = (req, res) => {
  const db = loadDB();
  const items = db.posts.filter((p) => p.status === 'published' && p.featured).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).map((p) => enrichPost(db, p));
  res.json({ items });
};

export const likePost = (req, res) => {
  const db = loadDB();
  const post = db.posts.find((p) => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết.' });
  post.likes += 1;
  saveDB(db);
  res.json({ likes: post.likes });
};

export const bookmarkToggle = (req, res) => {
  const db = loadDB();
  const postId = Number(req.params.id);
  const existing = db.bookmarks.find((b) => b.userId === req.user.id && b.postId === postId);
  let bookmarked = false;
  if (existing) {
    db.bookmarks = db.bookmarks.filter((b) => b !== existing);
  } else {
    db.bookmarks.push({ id: nextId(db.bookmarks), userId: req.user.id, postId, createdAt: new Date().toISOString() });
    bookmarked = true;
  }
  saveDB(db);
  res.json({ bookmarked });
};

export const listBookmarks = (req, res) => {
  const db = loadDB();
  const items = db.bookmarks
    .filter((b) => b.userId === req.user.id)
    .map((b) => db.posts.find((p) => p.id === b.postId))
    .filter(Boolean)
    .map((p) => enrichPost(db, p));
  res.json({ items });
};

export const listVideos = (req, res) => {
  const db = loadDB();
  const items = db.videos.map((video) => ({
    ...video,
    category: db.categories.find((c) => c.id === video.categoryId) || null
  }));
  res.json({ items });
};

export const listGallery = (req, res) => {
  const db = loadDB();
  res.json({ items: db.gallery });
};

export const listBanners = (req, res) => {
  const db = loadDB();
  res.json({ items: db.banners.filter((b) => b.active) });
};

export const listAds = (req, res) => {
  const db = loadDB();
  res.json({ items: db.ads.filter((a) => a.active) });
};

export const listComments = (req, res) => {
  const db = loadDB();
  const postId = Number(req.query.postId);
  const items = db.comments.filter((c) => c.postId === postId && c.approved).map((c) => ({
    ...c,
    user: db.users.find((u) => u.id === c.userId) || null
  }));
  res.json({ items });
};

export const createComment = (req, res) => {
  const db = loadDB();
  const { postId, name, content, honeypot } = req.body;
  if (honeypot) return res.status(400).json({ message: 'Bình luận không hợp lệ.' });
  const post = db.posts.find((p) => p.id === Number(postId));
  if (!post) return res.status(404).json({ message: 'Không tìm thấy bài viết.' });
  if (!name || !content) return res.status(400).json({ message: 'Thiếu tên hoặc nội dung.' });

  db.comments.unshift({
    id: nextId(db.comments),
    postId: Number(postId),
    userId: req.user?.id || null,
    name: String(name).trim(),
    content: String(content).trim(),
    approved: true,
    createdAt: new Date().toISOString()
  });
  saveDB(db);
  res.status(201).json({ message: 'Đã gửi bình luận.' });
};

export const contactCreate = (req, res) => {
  const db = loadDB();
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'Thiếu thông tin liên hệ.' });
  db.contacts.unshift({
    id: nextId(db.contacts),
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone || '').trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString()
  });
  saveDB(db);
  res.status(201).json({ message: 'Cảm ơn bạn đã liên hệ.' });
};

export const searchPosts = (req, res) => {
  const db = loadDB();
  const q = String(req.query.q || '').toLowerCase();
  const items = db.posts.filter((p) => p.status === 'published' && `${p.title} ${p.excerpt} ${p.content}`.toLowerCase().includes(q)).map((p) => enrichPost(db, p));
  res.json({ items });
};

export const siteStats = (req, res) => {
  const db = loadDB();
  res.json({
    posts: db.posts.length,
    comments: db.comments.length,
    users: db.users.length,
    views: db.posts.reduce((sum, p) => sum + (p.views || 0), 0),
    bookmarks: db.bookmarks.length
  });
};
