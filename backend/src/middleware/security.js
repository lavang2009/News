import rateLimit from 'express-rate-limit';
import sanitizeHtml from 'sanitize-html';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false
});

export const commentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false
});

export const cleanText = (input = '') => sanitizeHtml(String(input), {
  allowedTags: [],
  allowedAttributes: {}
}).trim();
