import jwt from 'jsonwebtoken';
import { loadDB } from '../storage.js';

export const authRequired = (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Bạn cần đăng nhập.' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'hmong-secret');
    const db = loadDB();
    const user = db.users.find((u) => u.id === payload.id);
    if (!user) return res.status(401).json({ message: 'Phiên đăng nhập không hợp lệ.' });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ.' });
  }
};

export const allowRoles = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Bạn cần đăng nhập.' });
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Bạn không có quyền truy cập.' });
  }
  next();
};
