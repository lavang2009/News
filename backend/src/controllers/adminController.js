import { loadDB, saveDB, nextId } from '../storage.js';
import { makeSlug } from '../utils/slug.js';

const ok = (res, data) => res.json(data);

export const dashboard = (req, res) => {
  const db = loadDB();
  ok(res, {
    stats: {
      posts: db.posts.length,
      categories: db.categories.length,
      users: db.users.length,
      comments: db.comments.length,
      views: db.posts.reduce((sum, p) => sum + (p.views || 0), 0),
      likes: db.posts.reduce((sum, p) => sum + (p.likes || 0), 0)
    },
    latestPosts: db.posts.slice().sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 5)
  });
};

export const listUsers = (req, res) => ok(res, { items: loadDB().users.map(({ passwordHash, ...u }) => u) });
export const listCategoriesAdmin = (req, res) => ok(res, { items: loadDB().categories });
export const listPostsAdmin = (req, res) => {
  const db = loadDB();
  ok(res, { items: db.posts.map((p) => ({ ...p, category: db.categories.find((c) => c.id === p.categoryId) || null, author: db.users.find((u) => u.id === p.authorId) || null })) });
};
export const listVideosAdmin = (req, res) => ok(res, { items: loadDB().videos });
export const listGalleryAdmin = (req, res) => ok(res, { items: loadDB().gallery });
export const listBannersAdmin = (req, res) => ok(res, { items: loadDB().banners });
export const listAdsAdmin = (req, res) => ok(res, { items: loadDB().ads });
export const listCommentsAdmin = (req, res) => ok(res, { items: loadDB().comments });
export const listContactsAdmin = (req, res) => ok(res, { items: loadDB().contacts });

const upsert = (arr, payload, id) => {
  const index = arr.findIndex((item) => item.id === Number(id));
  if (index >= 0) {
    arr[index] = { ...arr[index], ...payload };
    return arr[index];
  }
  const item = { id: nextId(arr), ...payload };
  arr.unshift(item);
  return item;
};

export const saveCategory = (req, res) => {
  const db = loadDB();
  const { id, name, description } = req.body;
  const payload = { name: String(name).trim(), description: String(description || '').trim(), slug: makeSlug(name) };
  const item = upsert(db.categories, payload, id);
  saveDB(db);
  res.json({ item });
};

export const deleteCategory = (req, res) => {
  const db = loadDB();
  const id = Number(req.params.id);
  db.categories = db.categories.filter((item) => item.id !== id);
  saveDB(db);
  res.json({ message: 'Đã xóa danh mục.' });
};

export const saveUser = (req, res) => {
  const db = loadDB();
  const { id, name, email, role, avatar, bio } = req.body;
  const user = db.users.find((u) => u.id === Number(id));
  if (!user && !email) return res.status(400).json({ message: 'Thiếu email.' });

  if (user) {
    Object.assign(user, { name, email, role, avatar, bio });
    saveDB(db);
    return res.json({ item: { ...user, passwordHash: undefined } });
  }

  const item = {
    id: nextId(db.users),
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    passwordHash: req.body.passwordHash || '',
    role: role || 'user',
    avatar: avatar || '/uploads/default-avatar.svg',
    bio: bio || '',
    createdAt: new Date().toISOString()
  };
  db.users.push(item);
  saveDB(db);
  res.json({ item: { ...item, passwordHash: undefined } });
};

export const deleteUser = (req, res) => {
  const db = loadDB();
  db.users = db.users.filter((item) => item.id !== Number(req.params.id));
  saveDB(db);
  res.json({ message: 'Đã xóa người dùng.' });
};

export const savePost = (req, res) => {
  const db = loadDB();
  const { id, title, excerpt, content, coverImage, categoryId, authorId, videoUrl, featured, status, tagIds } = req.body;
  const base = {
    title: String(title).trim(),
    excerpt: String(excerpt).trim(),
    content: String(content).trim(),
    coverImage: String(coverImage || '').trim(),
    categoryId: Number(categoryId),
    authorId: Number(authorId),
    videoUrl: String(videoUrl || '').trim(),
    featured: Boolean(featured),
    status: status || 'published',
    tagIds: Array.isArray(tagIds) ? tagIds.map(Number) : []
  };
  let item = db.posts.find((p) => p.id === Number(id));
  if (item) {
    Object.assign(item, base, { slug: makeSlug(title), updatedAt: new Date().toISOString() });
  } else {
    item = { id: nextId(db.posts), ...base, slug: makeSlug(title), views: 0, likes: 0, publishedAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    db.posts.unshift(item);
  }
  saveDB(db);
  res.json({ item });
};

export const deletePost = (req, res) => {
  const db = loadDB();
  db.posts = db.posts.filter((item) => item.id !== Number(req.params.id));
  saveDB(db);
  res.json({ message: 'Đã xóa bài viết.' });
};

export const saveVideo = (req, res) => {
  const db = loadDB();
  const { id, title, youtubeId, description, categoryId, featured } = req.body;
  const payload = {
    title: String(title).trim(),
    youtubeId: String(youtubeId).trim(),
    description: String(description || '').trim(),
    categoryId: categoryId ? Number(categoryId) : null,
    featured: Boolean(featured)
  };
  const item = upsert(db.videos, payload, id);
  saveDB(db);
  res.json({ item });
};

export const deleteVideo = (req, res) => {
  const db = loadDB();
  db.videos = db.videos.filter((item) => item.id !== Number(req.params.id));
  saveDB(db);
  res.json({ message: 'Đã xóa video.' });
};

export const saveGallery = (req, res) => {
  const db = loadDB();
  const { id, title, imageUrl, category, description } = req.body;
  const item = upsert(db.gallery, {
    title: String(title).trim(),
    imageUrl: String(imageUrl).trim(),
    category: String(category).trim(),
    description: String(description || '').trim()
  }, id);
  saveDB(db);
  res.json({ item });
};

export const deleteGallery = (req, res) => {
  const db = loadDB();
  db.gallery = db.gallery.filter((item) => item.id !== Number(req.params.id));
  saveDB(db);
  res.json({ message: 'Đã xóa ảnh.' });
};

export const saveBanner = (req, res) => {
  const db = loadDB();
  const { id, title, subtitle, imageUrl, linkUrl, active } = req.body;
  const item = upsert(db.banners, {
    title: String(title).trim(),
    subtitle: String(subtitle || '').trim(),
    imageUrl: String(imageUrl).trim(),
    linkUrl: String(linkUrl || '').trim(),
    active: Boolean(active)
  }, id);
  saveDB(db);
  res.json({ item });
};

export const deleteBanner = (req, res) => {
  const db = loadDB();
  db.banners = db.banners.filter((item) => item.id !== Number(req.params.id));
  saveDB(db);
  res.json({ message: 'Đã xóa banner.' });
};

export const saveAd = (req, res) => {
  const db = loadDB();
  const { id, title, imageUrl, linkUrl, active } = req.body;
  const item = upsert(db.ads, {
    title: String(title).trim(),
    imageUrl: String(imageUrl).trim(),
    linkUrl: String(linkUrl || '').trim(),
    active: Boolean(active)
  }, id);
  saveDB(db);
  res.json({ item });
};

export const deleteAd = (req, res) => {
  const db = loadDB();
  db.ads = db.ads.filter((item) => item.id !== Number(req.params.id));
  saveDB(db);
  res.json({ message: 'Đã xóa quảng cáo.' });
};

export const approveComment = (req, res) => {
  const db = loadDB();
  const comment = db.comments.find((c) => c.id === Number(req.params.id));
  if (!comment) return res.status(404).json({ message: 'Không tìm thấy bình luận.' });
  comment.approved = true;
  saveDB(db);
  res.json({ message: 'Đã duyệt bình luận.' });
};

export const deleteComment = (req, res) => {
  const db = loadDB();
  db.comments = db.comments.filter((item) => item.id !== Number(req.params.id));
  saveDB(db);
  res.json({ message: 'Đã xóa bình luận.' });
};

export const deleteContact = (req, res) => {
  const db = loadDB();
  db.contacts = db.contacts.filter((item) => item.id !== Number(req.params.id));
  saveDB(db);
  res.json({ message: 'Đã xóa liên hệ.' });
};
