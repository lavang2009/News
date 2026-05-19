import { Router } from 'express';
import { authRequired, allowRoles } from '../middleware/auth.js';
import { authLimiter, commentLimiter } from '../middleware/security.js';
import { register, login, me, updateProfile, changePassword } from '../controllers/authController.js';
import {
  listCategories,
  listPosts,
  getPostBySlug,
  listTrending,
  listFeatured,
  likePost,
  bookmarkToggle,
  listBookmarks,
  listVideos,
  listGallery,
  listBanners,
  listAds,
  listComments,
  createComment,
  contactCreate,
  searchPosts,
  siteStats
} from '../controllers/contentController.js';
import {
  dashboard,
  listUsers,
  listCategoriesAdmin,
  listPostsAdmin,
  listVideosAdmin,
  listGalleryAdmin,
  listBannersAdmin,
  listAdsAdmin,
  listCommentsAdmin,
  listContactsAdmin,
  saveCategory,
  deleteCategory,
  saveUser,
  deleteUser,
  savePost,
  deletePost,
  saveVideo,
  deleteVideo,
  saveGallery,
  deleteGallery,
  saveBanner,
  deleteBanner,
  saveAd,
  deleteAd,
  approveComment,
  deleteComment,
  deleteContact
} from '../controllers/adminController.js';
import { upload } from '../config/upload.js';
import { uploadFile } from '../controllers/uploadController.js';
import { sitemap, robots } from '../controllers/metaController.js';

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true, name: 'H’Mông Việt News API' }));
router.get('/sitemap.xml', sitemap);
router.get('/robots.txt', robots);
router.get('/stats', siteStats);

router.post('/auth/register', authLimiter, register);
router.post('/auth/login', authLimiter, login);
router.get('/auth/me', authRequired, me);
router.patch('/auth/profile', authRequired, updateProfile);
router.patch('/auth/password', authRequired, changePassword);

router.get('/categories', listCategories);
router.get('/posts', listPosts);
router.get('/posts/trending', listTrending);
router.get('/posts/featured', listFeatured);
router.get('/posts/:slug', getPostBySlug);
router.post('/posts/:id/like', likePost);
router.post('/posts/:id/bookmark', authRequired, bookmarkToggle);
router.get('/bookmarks', authRequired, listBookmarks);
router.get('/videos', listVideos);
router.get('/gallery', listGallery);
router.get('/banners', listBanners);
router.get('/ads', listAds);
router.get('/comments', listComments);
router.post('/comments', commentLimiter, authRequired, createComment);
router.post('/contact', contactCreate);
router.get('/search', searchPosts);

router.post('/upload', authRequired, upload.single('file'), uploadFile);

router.get('/admin/dashboard', authRequired, allowRoles('admin', 'editor'), dashboard);
router.get('/admin/users', authRequired, allowRoles('admin'), listUsers);
router.get('/admin/categories', authRequired, allowRoles('admin', 'editor'), listCategoriesAdmin);
router.get('/admin/posts', authRequired, allowRoles('admin', 'editor'), listPostsAdmin);
router.get('/admin/videos', authRequired, allowRoles('admin', 'editor'), listVideosAdmin);
router.get('/admin/gallery', authRequired, allowRoles('admin', 'editor'), listGalleryAdmin);
router.get('/admin/banners', authRequired, allowRoles('admin', 'editor'), listBannersAdmin);
router.get('/admin/ads', authRequired, allowRoles('admin', 'editor'), listAdsAdmin);
router.get('/admin/comments', authRequired, allowRoles('admin', 'editor'), listCommentsAdmin);
router.get('/admin/contacts', authRequired, allowRoles('admin', 'editor'), listContactsAdmin);

router.post('/admin/categories', authRequired, allowRoles('admin', 'editor'), saveCategory);
router.delete('/admin/categories/:id', authRequired, allowRoles('admin', 'editor'), deleteCategory);

router.post('/admin/users', authRequired, allowRoles('admin'), saveUser);
router.delete('/admin/users/:id', authRequired, allowRoles('admin'), deleteUser);

router.post('/admin/posts', authRequired, allowRoles('admin', 'editor'), savePost);
router.delete('/admin/posts/:id', authRequired, allowRoles('admin', 'editor'), deletePost);

router.post('/admin/videos', authRequired, allowRoles('admin', 'editor'), saveVideo);
router.delete('/admin/videos/:id', authRequired, allowRoles('admin', 'editor'), deleteVideo);

router.post('/admin/gallery', authRequired, allowRoles('admin', 'editor'), saveGallery);
router.delete('/admin/gallery/:id', authRequired, allowRoles('admin', 'editor'), deleteGallery);

router.post('/admin/banners', authRequired, allowRoles('admin', 'editor'), saveBanner);
router.delete('/admin/banners/:id', authRequired, allowRoles('admin', 'editor'), deleteBanner);

router.post('/admin/ads', authRequired, allowRoles('admin', 'editor'), saveAd);
router.delete('/admin/ads/:id', authRequired, allowRoles('admin', 'editor'), deleteAd);

router.patch('/admin/comments/:id/approve', authRequired, allowRoles('admin', 'editor'), approveComment);
router.delete('/admin/comments/:id', authRequired, allowRoles('admin', 'editor'), deleteComment);
router.delete('/admin/contacts/:id', authRequired, allowRoles('admin', 'editor'), deleteContact);

export default router;
