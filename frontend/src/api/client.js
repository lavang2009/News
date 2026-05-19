import { auth } from '../lib/firebase';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from 'firebase/auth';
import { seedData } from '../data/seed';

const STORE_KEY = 'hmong-viet-news-store-v2';
const DEFAULT_BOOKMARKS = {};

const hasWindow = typeof window !== 'undefined';

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const nowISO = () => new Date().toISOString();

const toNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const slugify = (value = '') =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `item-${Date.now()}`;

const sanitizeHtml = (html = '') =>
  String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/ on\w+="[^"]*"/gi, '')
    .replace(/ on\w+='[^']*'/gi, '');

const storage = {
  get(key, fallback = null) {
    if (!hasWindow) return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    if (!hasWindow) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

const initialStore = () => ({
  ...deepClone(seedData),
  bookmarksByUserId: {},
  uploads: []
});

let storeCache = null;

const loadStore = () => {
  if (storeCache) return storeCache;

  const stored = storage.get(STORE_KEY, null);
  if (stored && typeof stored === 'object') {
    storeCache = {
      ...initialStore(),
      ...stored,
      bookmarksByUserId: stored.bookmarksByUserId || {},
      uploads: stored.uploads || []
    };
    return storeCache;
  }

  storeCache = initialStore();
  storage.set(STORE_KEY, storeCache);
  return storeCache;
};

const saveStore = () => {
  if (!storeCache) return;
  storage.set(STORE_KEY, storeCache);
};

const resetStore = () => {
  storeCache = initialStore();
  saveStore();
};

const getStore = () => loadStore();

const getId = (collection) => {
  const store = loadStore();
  const items = Array.isArray(store[collection]) ? store[collection] : [];
  return items.reduce((max, item) => Math.max(max, toNumber(item.id, 0)), 0) + 1;
};

const findCategory = (id) => loadStore().categories.find((item) => toNumber(item.id) === toNumber(id));
const findCategoryBySlug = (slug) => loadStore().categories.find((item) => item.slug === slug);

const findAuthor = (id) => loadStore().users.find((item) => toNumber(item.id) === toNumber(id));
const findTag = (id) => loadStore().tags.find((item) => toNumber(item.id) === toNumber(id));

const currentAuthUser = () => auth.currentUser || null;

const seedUserFromAuth = (firebaseUser) => {
  const store = loadStore();
  const email = (firebaseUser.email || '').toLowerCase();
  const matchedSeed = store.users.find((user) => (user.email || '').toLowerCase() === email);

  const profile = {
    id: matchedSeed?.id || firebaseUser.uid,
    firebaseUid: firebaseUser.uid,
    name: firebaseUser.displayName || matchedSeed?.name || email.split('@')[0] || 'Bạn đọc',
    email: firebaseUser.email || matchedSeed?.email || '',
    role: matchedSeed?.role || 'user',
    avatar: firebaseUser.photoURL || matchedSeed?.avatar || '/images/default-avatar.svg',
    bio: matchedSeed?.bio || '',
    createdAt: matchedSeed?.createdAt || firebaseUser.metadata?.creationTime || nowISO(),
    updatedAt: nowISO(),
    provider: firebaseUser.providerData?.[0]?.providerId || 'firebase'
  };

  const existingIndex = store.users.findIndex((user) => user.firebaseUid === firebaseUser.uid || (user.email || '').toLowerCase() === email);
  if (existingIndex >= 0) {
    store.users[existingIndex] = { ...store.users[existingIndex], ...profile };
  } else {
    store.users.push(profile);
  }

  if (!store.bookmarksByUserId[firebaseUser.uid]) {
    store.bookmarksByUserId[firebaseUser.uid] = [];
  }

  saveStore();
  return profile;
};

const publicProfile = (profile) => ({
  id: profile.id,
  firebaseUid: profile.firebaseUid,
  name: profile.name,
  email: profile.email,
  role: profile.role || 'user',
  avatar: profile.avatar || '/images/default-avatar.svg',
  bio: profile.bio || '',
  createdAt: profile.createdAt,
  updatedAt: profile.updatedAt,
  provider: profile.provider || 'firebase'
});

const getProfileByCurrentUser = () => {
  const user = currentAuthUser();
  if (!user) return null;
  return seedUserFromAuth(user);
};

const hydrateUserIdentity = (post, store = loadStore()) => {
  const category = findCategory(post.categoryId);
  const author = findAuthor(post.authorId);
  const tags = (post.tagIds || []).map((id) => findTag(id)).filter(Boolean);
  return {
    ...deepClone(post),
    category: category ? { id: category.id, name: category.name, slug: category.slug, description: category.description } : null,
    author: author ? { id: author.id, name: author.name, avatar: author.avatar, role: author.role } : { name: 'Quản trị viên' },
    tags: tags.map((tag) => ({ id: tag.id, name: tag.name, slug: tag.slug })),
    publishedAt: post.publishedAt || post.createdAt || nowISO(),
    updatedAt: post.updatedAt || post.createdAt || nowISO(),
    coverImage: post.coverImage || '/images/hero.svg',
    likes: toNumber(post.likes, 0),
    views: toNumber(post.views, 0)
  };
};

const enrichPosts = (posts, store = loadStore()) => posts.map((post) => hydrateUserIdentity(post, store));

const compareDesc = (a, b, key) => new Date(b[key] || 0).getTime() - new Date(a[key] || 0).getTime();

const sortPosts = (items, sort = 'latest') => {
  const list = [...items];
  if (sort === 'featured') {
    return list.sort((a, b) => {
      const featuredDiff = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (featuredDiff !== 0) return featuredDiff;
      return compareDesc(a, b, 'publishedAt');
    });
  }
  if (sort === 'popular') return list.sort((a, b) => toNumber(b.views) - toNumber(a.views));
  return list.sort((a, b) => compareDesc(a, b, 'publishedAt'));
};

const paginate = (items, page = 1, limit = 10) => {
  const safeLimit = Math.max(1, toNumber(limit, 10));
  const totalPages = Math.max(1, Math.ceil(items.length / safeLimit));
  const safePage = Math.min(Math.max(1, toNumber(page, 1)), totalPages);
  const start = (safePage - 1) * safeLimit;
  return {
    items: items.slice(start, start + safeLimit),
    pagination: {
      page: safePage,
      limit: safeLimit,
      total: items.length,
      totalPages
    }
  };
};

const getBookmarksForUser = (user) => {
  const store = loadStore();
  if (!user) return [];
  const ids = store.bookmarksByUserId[user.uid] || [];
  return ids.map((id) => enrichPosts(store.posts.filter((post) => toNumber(post.id) === toNumber(id)), store)[0]).filter(Boolean);
};

const toggleBookmarkForPost = (postId) => {
  const user = currentAuthUser();
  if (!user) {
    throw new Error('Vui lòng đăng nhập để lưu bài viết.');
  }
  const store = loadStore();
  const key = user.uid;
  const ids = new Set(store.bookmarksByUserId[key] || []);
  const normalizedId = toNumber(postId);
  if (ids.has(normalizedId)) ids.delete(normalizedId);
  else ids.add(normalizedId);
  store.bookmarksByUserId[key] = [...ids];
  saveStore();
  if (hasWindow) {
    window.dispatchEvent(new CustomEvent('hmong:bookmarks-changed'));
  }
  return { bookmarked: ids.has(normalizedId), bookmarks: getBookmarksForUser(user) };
};

const createOrUpdateProfile = async (payload = {}) => {
  const user = currentAuthUser();
  if (!user) throw new Error('Phiên đăng nhập đã hết hạn.');
  const store = loadStore();
  const base = seedUserFromAuth(user);
  const updated = {
    ...base,
    name: (payload.name || base.name || '').trim() || base.name,
    bio: (payload.bio ?? base.bio ?? '').trim(),
    avatar: (payload.avatar || base.avatar || '/images/default-avatar.svg').trim(),
    updatedAt: nowISO()
  };

  const index = store.users.findIndex((item) => item.firebaseUid === user.uid || (item.email || '').toLowerCase() === (user.email || '').toLowerCase());
  if (index >= 0) store.users[index] = { ...store.users[index], ...updated };
  else store.users.push(updated);

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: updated.name,
      photoURL: updated.avatar
    });
  }

  saveStore();
  return { user: publicProfile(updated), bookmarks: getBookmarksForUser(user) };
};

const changePassword = async ({ currentPassword = '', newPassword = '' } = {}) => {
  const user = currentAuthUser();
  if (!user || !user.email) throw new Error('Bạn cần đăng nhập bằng email và mật khẩu để đổi mật khẩu.');
  if (!currentPassword || !newPassword) throw new Error('Vui lòng nhập đầy đủ mật khẩu hiện tại và mật khẩu mới.');
  if ((user.providerData || []).some((provider) => provider.providerId === 'google.com')) {
    throw new Error('Tài khoản đăng nhập bằng Google không đổi mật khẩu theo cách này.');
  }
  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
  return { message: 'Đã đổi mật khẩu thành công.' };
};

const getUserProfile = () => {
  const user = currentAuthUser();
  if (!user) return { user: null, bookmarks: [] };
  const profile = seedUserFromAuth(user);
  return { user: publicProfile(profile), bookmarks: getBookmarksForUser(user) };
};

const setContactEntry = (entry) => {
  const store = loadStore();
  store.contacts.unshift({
    id: getId('contacts'),
    name: String(entry.name || '').trim(),
    email: String(entry.email || '').trim(),
    phone: String(entry.phone || '').trim(),
    message: String(entry.message || '').trim(),
    createdAt: nowISO()
  });
  saveStore();
};

const upsertCategory = (payload = {}) => {
  const store = loadStore();
  const id = payload.id ? toNumber(payload.id) : getId('categories');
  const now = nowISO();
  const existing = store.categories.find((item) => toNumber(item.id) === id);
  const next = {
    id,
    name: String(payload.name || existing?.name || '').trim(),
    slug: payload.slug ? slugify(payload.slug) : slugify(payload.name || existing?.name || ''),
    description: String(payload.description || existing?.description || '').trim(),
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
  if (existing) Object.assign(existing, next);
  else store.categories.push(next);
  saveStore();
  return next;
};

const upsertVideo = (payload = {}) => {
  const store = loadStore();
  const id = payload.id ? toNumber(payload.id) : getId('videos');
  const now = nowISO();
  const existing = store.videos.find((item) => toNumber(item.id) === id);
  const next = {
    id,
    title: String(payload.title || existing?.title || '').trim(),
    youtubeId: String(payload.youtubeId || existing?.youtubeId || '').trim(),
    description: String(payload.description || existing?.description || '').trim(),
    categoryId: toNumber(payload.categoryId || existing?.categoryId || 0),
    featured: Boolean(payload.featured ?? existing?.featured ?? false),
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
  if (existing) Object.assign(existing, next);
  else store.videos.push(next);
  saveStore();
  return next;
};

const upsertGallery = (payload = {}) => {
  const store = loadStore();
  const id = payload.id ? toNumber(payload.id) : getId('gallery');
  const existing = store.gallery.find((item) => toNumber(item.id) === id);
  const next = {
    id,
    title: String(payload.title || existing?.title || '').trim(),
    imageUrl: String(payload.imageUrl || existing?.imageUrl || '/images/hero.svg').trim(),
    category: String(payload.category || existing?.category || '').trim(),
    description: String(payload.description || existing?.description || '').trim(),
    updatedAt: nowISO()
  };
  if (existing) Object.assign(existing, next);
  else store.gallery.push(next);
  saveStore();
  return next;
};

const upsertBanner = (payload = {}) => {
  const store = loadStore();
  const id = payload.id ? toNumber(payload.id) : getId('banners');
  const existing = store.banners.find((item) => toNumber(item.id) === id);
  const next = {
    id,
    title: String(payload.title || existing?.title || '').trim(),
    subtitle: String(payload.subtitle || existing?.subtitle || '').trim(),
    imageUrl: String(payload.imageUrl || existing?.imageUrl || '/images/banner-1.svg').trim(),
    linkUrl: String(payload.linkUrl || existing?.linkUrl || '/').trim(),
    active: Boolean(payload.active ?? existing?.active ?? true),
    updatedAt: nowISO()
  };
  if (existing) Object.assign(existing, next);
  else store.banners.push(next);
  saveStore();
  return next;
};

const upsertAd = (payload = {}) => {
  const store = loadStore();
  const id = payload.id ? toNumber(payload.id) : getId('ads');
  const existing = store.ads.find((item) => toNumber(item.id) === id);
  const next = {
    id,
    title: String(payload.title || existing?.title || '').trim(),
    imageUrl: String(payload.imageUrl || existing?.imageUrl || '/images/ad-1.svg').trim(),
    linkUrl: String(payload.linkUrl || existing?.linkUrl || '/').trim(),
    active: Boolean(payload.active ?? existing?.active ?? true),
    updatedAt: nowISO()
  };
  if (existing) Object.assign(existing, next);
  else store.ads.push(next);
  saveStore();
  return next;
};

const normalizeTags = (tagIds) => {
  if (Array.isArray(tagIds)) return tagIds.map((id) => toNumber(id)).filter(Boolean);
  if (typeof tagIds === 'string') {
    return tagIds.split(',').map((part) => toNumber(part.trim())).filter(Boolean);
  }
  return [];
};

const upsertPost = (payload = {}) => {
  const store = loadStore();
  const id = payload.id ? toNumber(payload.id) : getId('posts');
  const existing = store.posts.find((item) => toNumber(item.id) === id);
  const title = String(payload.title || existing?.title || '').trim();
  const now = nowISO();
  const next = {
    id,
    title,
    slug: payload.slug ? slugify(payload.slug) : slugify(title),
    excerpt: String(payload.excerpt || existing?.excerpt || '').trim(),
    content: sanitizeHtml(String(payload.content || existing?.content || '').trim()),
    coverImage: String(payload.coverImage || existing?.coverImage || '/images/hero.svg').trim(),
    categoryId: toNumber(payload.categoryId || existing?.categoryId || 1),
    authorId: toNumber(payload.authorId || existing?.authorId || 1),
    videoUrl: String(payload.videoUrl || existing?.videoUrl || '').trim(),
    featured: Boolean(payload.featured ?? existing?.featured ?? false),
    status: String(payload.status || existing?.status || 'published'),
    views: toNumber(existing?.views || payload.views, 0),
    likes: toNumber(existing?.likes || payload.likes, 0),
    publishedAt: payload.publishedAt || existing?.publishedAt || now,
    updatedAt: now,
    tagIds: normalizeTags(payload.tagIds || existing?.tagIds || [])
  };
  if (existing) Object.assign(existing, next);
  else store.posts.unshift(next);
  saveStore();
  return hydrateUserIdentity(next, store);
};

const removeById = (collection, id) => {
  const store = loadStore();
  const idx = store[collection].findIndex((item) => toNumber(item.id) === toNumber(id));
  if (idx >= 0) {
    store[collection].splice(idx, 1);
    saveStore();
    return true;
  }
  return false;
};

const getPosts = (searchParams = new URLSearchParams()) => {
  const store = loadStore();
  const sort = searchParams.get('sort') || 'latest';
  const featuredParam = searchParams.get('featured');
  const category = searchParams.get('category') || '';
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 10;

  let items = [...store.posts];

  if (featuredParam === 'true') items = items.filter((post) => post.featured);
  if (category) {
    const cat = findCategoryBySlug(category);
    if (cat) items = items.filter((post) => toNumber(post.categoryId) === toNumber(cat.id));
    else items = items.filter((post) => (post.category?.slug || '') === category);
  }

  items = sortPosts(items, sort);
  const paged = paginate(items, page, limit);
  return {
    items: enrichPosts(paged.items, store),
    pagination: paged.pagination
  };
};

const getPostBySlug = (slug) => {
  const store = loadStore();
  const post = store.posts.find((item) => item.slug === slug);
  if (!post) return { item: null, related: [] };
  const related = store.posts
    .filter((item) => item.id !== post.id && item.categoryId === post.categoryId)
    .sort((a, b) => toNumber(b.views) - toNumber(a.views))
    .slice(0, 4);
  return {
    item: enrichPosts([post], store)[0],
    related: enrichPosts(related, store)
  };
};

const getComments = (postId) => {
  const store = loadStore();
  return store.comments
    .filter((comment) => toNumber(comment.postId) === toNumber(postId) && comment.approved !== false)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

const addComment = (payload = {}) => {
  if (String(payload.honeypot || '').trim()) return { message: 'Đã nhận bình luận.' };
  const store = loadStore();
  const item = {
    id: getId('comments'),
    postId: toNumber(payload.postId),
    name: String(payload.name || 'Bạn đọc').trim(),
    content: String(payload.content || '').trim(),
    approved: true,
    createdAt: nowISO()
  };
  store.comments.unshift(item);
  saveStore();
  return { message: 'Bình luận đã được gửi.', item };
};

const dashboardStats = () => {
  const store = loadStore();
  const views = store.posts.reduce((sum, post) => sum + toNumber(post.views), 0);
  const likes = store.posts.reduce((sum, post) => sum + toNumber(post.likes), 0);
  return {
    stats: {
      posts: store.posts.length,
      categories: store.categories.length,
      users: store.users.length,
      comments: store.comments.length,
      views,
      likes
    },
    latestPosts: [...store.posts].sort((a, b) => compareDesc(a, b, 'publishedAt')).slice(0, 6).map((post) => enrichPosts([post], store)[0])
  };
};

const listAdminPosts = () => {
  const store = loadStore();
  return { items: [...store.posts].sort((a, b) => compareDesc(a, b, 'publishedAt')).map((post) => enrichPosts([post], store)[0]) };
};

const listAdminCategories = () => ({ items: [...loadStore().categories].sort((a, b) => a.id - b.id) });
const listAdminUsers = () => ({
  items: [...loadStore().users].map((user) => publicProfile(user))
});
const listAdminVideos = () => ({ items: [...loadStore().videos].sort((a, b) => compareDesc(a, b, 'createdAt')) });
const listAdminGallery = () => ({ items: [...loadStore().gallery].sort((a, b) => Number(b.id) - Number(a.id)) });
const listAdminBanners = () => ({ items: [...loadStore().banners].sort((a, b) => Number(a.id) - Number(b.id)) });
const listAdminAds = () => ({ items: [...loadStore().ads].sort((a, b) => Number(a.id) - Number(b.id)) });
const listAdminComments = () => ({
  items: [...loadStore().comments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
});
const listAdminContacts = () => ({
  items: [...loadStore().contacts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
});

const apiDelay = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(path, options = {}) {
  await apiDelay();
  const url = new URL(path, 'https://hmong.local');
  const pathname = url.pathname;
  const method = String(options.method || 'GET').toUpperCase();
  const body = options.body ? JSON.parse(options.body) : null;

  if (pathname === '/auth/me' && method === 'GET') {
    return getUserProfile();
  }

  if (pathname === '/auth/profile' && method === 'PATCH') {
    return createOrUpdateProfile(body || {});
  }

  if (pathname === '/auth/password' && method === 'PATCH') {
    return changePassword(body || {});
  }

  if (pathname === '/contact' && method === 'POST') {
    setContactEntry(body || {});
    return { message: 'Đã gửi liên hệ thành công.' };
  }

  if (pathname === '/stats' && method === 'GET') {
    const store = loadStore();
    return {
      views: store.posts.reduce((sum, post) => sum + toNumber(post.views), 0),
      posts: store.posts.length
    };
  }

  if (pathname === '/categories' && method === 'GET') {
    return { items: [...loadStore().categories].sort((a, b) => a.id - b.id) };
  }

  if (pathname === '/banners' && method === 'GET') {
    return { items: loadStore().banners.filter((item) => item.active !== false) };
  }

  if (pathname === '/ads' && method === 'GET') {
    return { items: loadStore().ads.filter((item) => item.active !== false) };
  }

  if (pathname === '/videos' && method === 'GET') {
    return { items: [...loadStore().videos].sort((a, b) => Number(b.featured) - Number(a.featured)) };
  }

  if (pathname === '/gallery' && method === 'GET') {
    return { items: [...loadStore().gallery] };
  }

  if (pathname === '/posts/trending' && method === 'GET') {
    const store = loadStore();
    const items = [...store.posts].sort((a, b) => toNumber(b.views) - toNumber(a.views)).slice(0, 6);
    return { items: enrichPosts(items, store) };
  }

  if (pathname === '/posts' && method === 'GET') {
    return getPosts(url.searchParams);
  }

  if (pathname.startsWith('/posts/') && method === 'GET') {
    const slug = decodeURIComponent(pathname.replace('/posts/', ''));
    return getPostBySlug(slug);
  }

  if (pathname.startsWith('/posts/') && pathname.endsWith('/like') && method === 'POST') {
    const id = toNumber(pathname.split('/')[2]);
    const store = loadStore();
    const post = store.posts.find((item) => toNumber(item.id) === id);
    if (!post) throw new Error('Bài viết không tồn tại.');
    post.likes = toNumber(post.likes) + 1;
    saveStore();
    return { likes: post.likes };
  }

  if (pathname.startsWith('/posts/') && pathname.endsWith('/bookmark') && method === 'POST') {
    const id = toNumber(pathname.split('/')[2]);
    return toggleBookmarkForPost(id);
  }

  if (pathname === '/comments' && method === 'GET') {
    return { items: getComments(url.searchParams.get('postId')) };
  }

  if (pathname === '/comments' && method === 'POST') {
    return addComment(body || {});
  }

  if (pathname === '/search' && method === 'GET') {
    const q = String(url.searchParams.get('q') || '').trim().toLowerCase();
    if (!q) return { items: [] };
    const store = loadStore();
    const items = store.posts.filter((post) => {
      const category = findCategory(post.categoryId);
      const tags = (post.tagIds || []).map((id) => findTag(id)).filter(Boolean);
      const haystack = [
        post.title,
        post.excerpt,
        post.content,
        category?.name,
        category?.slug,
        ...tags.map((tag) => tag.name),
        ...tags.map((tag) => tag.slug)
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
    return { items: enrichPosts(items, store) };
  }

  if (pathname === '/admin/dashboard' && method === 'GET') {
    return dashboardStats();
  }

  if (pathname === '/admin/posts' && method === 'GET') {
    return listAdminPosts();
  }

  if (pathname === '/admin/posts' && method === 'POST') {
    return { item: upsertPost(body || {}) };
  }

  if (pathname.startsWith('/admin/posts/') && method === 'DELETE') {
    const id = pathname.split('/')[3];
    removeById('posts', id);
    return { message: 'Đã xóa bài viết.' };
  }

  if (pathname === '/admin/categories' && method === 'GET') {
    return listAdminCategories();
  }

  if (pathname === '/admin/categories' && method === 'POST') {
    return { item: upsertCategory(body || {}) };
  }

  if (pathname === '/admin/users' && method === 'GET') {
    return listAdminUsers();
  }

  if (pathname === '/admin/videos' && method === 'GET') {
    return listAdminVideos();
  }

  if (pathname === '/admin/videos' && method === 'POST') {
    return { item: upsertVideo(body || {}) };
  }

  if (pathname === '/admin/gallery' && method === 'GET') {
    return listAdminGallery();
  }

  if (pathname === '/admin/gallery' && method === 'POST') {
    return { item: upsertGallery(body || {}) };
  }

  if (pathname === '/admin/banners' && method === 'GET') {
    return listAdminBanners();
  }

  if (pathname === '/admin/banners' && method === 'POST') {
    return { item: upsertBanner(body || {}) };
  }

  if (pathname === '/admin/ads' && method === 'GET') {
    return listAdminAds();
  }

  if (pathname === '/admin/ads' && method === 'POST') {
    return { item: upsertAd(body || {}) };
  }

  if (pathname === '/admin/comments' && method === 'GET') {
    return listAdminComments();
  }

  if (pathname.startsWith('/admin/comments/') && pathname.endsWith('/approve') && method === 'PATCH') {
    const id = pathname.split('/')[3];
    const store = loadStore();
    const comment = store.comments.find((item) => toNumber(item.id) === toNumber(id));
    if (comment) comment.approved = true;
    saveStore();
    return { message: 'Đã duyệt bình luận.' };
  }

  if (pathname.startsWith('/admin/comments/') && method === 'DELETE') {
    const id = pathname.split('/')[3];
    removeById('comments', id);
    return { message: 'Đã xóa bình luận.' };
  }

  if (pathname === '/admin/contacts' && method === 'GET') {
    return listAdminContacts();
  }

  if (pathname.startsWith('/admin/contacts/') && method === 'DELETE') {
    const id = pathname.split('/')[3];
    removeById('contacts', id);
    return { message: 'Đã xóa liên hệ.' };
  }

  throw new Error(`Không hỗ trợ API: ${method} ${pathname}`);
}

async function upload(path, formData) {
  await apiDelay();
  if (path !== '/upload') throw new Error('Đường dẫn upload không hợp lệ.');
  const file = formData?.get?.('file');
  if (!file) throw new Error('Vui lòng chọn tệp upload.');
  if (typeof window === 'undefined' || typeof FileReader === 'undefined') {
    throw new Error('Trình duyệt không hỗ trợ tải tệp.');
  }

  const result = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Không thể đọc tệp upload.'));
    reader.readAsDataURL(file);
  });

  const store = loadStore();
  const entry = {
    id: getId('uploads'),
    name: file.name,
    type: file.type,
    path: result,
    createdAt: nowISO()
  };
  store.uploads.unshift(entry);
  saveStore();

  return { file: entry };
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body || {}) }),
  patch: (path, body) => request(path, { method: 'PATCH', body: JSON.stringify(body || {}) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body || {}) }),
  del: (path) => request(path, { method: 'DELETE' }),
  upload,
  resetStore
};
