import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loadDB, saveDB, nextId } from '../storage.js';

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'hmong-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

export const register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Thiếu dữ liệu đăng ký.' });
  if (String(password).length < 8) return res.status(400).json({ message: 'Mật khẩu phải từ 8 ký tự.' });

  const db = loadDB();
  if (db.users.some((u) => u.email.toLowerCase() === String(email).toLowerCase())) {
    return res.status(409).json({ message: 'Email đã tồn tại.' });
  }

  const user = {
    id: nextId(db.users),
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    passwordHash: bcrypt.hashSync(password, 10),
    role: 'user',
    avatar: '/uploads/default-avatar.svg',
    bio: '',
    createdAt: new Date().toISOString()
  };

  db.users.push(user);
  saveDB(db);

  const token = signToken(user);
  res.status(201).json({ token, user: { ...user, passwordHash: undefined } });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const db = loadDB();
  const user = db.users.find((u) => u.email.toLowerCase() === String(email || '').toLowerCase());
  if (!user) return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
  const ok = bcrypt.compareSync(String(password || ''), user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });

  const token = signToken(user);
  res.json({ token, user: { ...user, passwordHash: undefined } });
};

export const me = (req, res) => {
  const { passwordHash, ...safe } = req.user;
  const db = loadDB();
  const bookmarks = db.bookmarks
    .filter((b) => b.userId === req.user.id)
    .map((b) => db.posts.find((p) => p.id === b.postId))
    .filter(Boolean)
    .map((post) => ({ id: post.id, title: post.title, slug: post.slug, coverImage: post.coverImage, publishedAt: post.publishedAt }));

  res.json({ user: safe, bookmarks });
};

export const updateProfile = (req, res) => {
  const db = loadDB();
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng.' });

  const { name, bio, avatar } = req.body;
  if (name) user.name = String(name).trim();
  if (bio !== undefined) user.bio = String(bio).trim();
  if (avatar !== undefined) user.avatar = String(avatar).trim();
  saveDB(db);
  const { passwordHash, ...safe } = user;
  res.json({ user: safe });
};

export const changePassword = (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Thiếu dữ liệu.' });
  if (String(newPassword).length < 8) return res.status(400).json({ message: 'Mật khẩu mới quá ngắn.' });

  const db = loadDB();
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng.' });

  if (!bcrypt.compareSync(String(currentPassword), user.passwordHash)) {
    return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng.' });
  }
  user.passwordHash = bcrypt.hashSync(String(newPassword), 10);
  saveDB(db);
  res.json({ message: 'Đổi mật khẩu thành công.' });
};
