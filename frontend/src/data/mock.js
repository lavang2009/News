import { seedData } from './seed';

const toCategory = (id) => {
  const category = seedData.categories.find((item) => item.id === id);
  return category ? { name: category.name, slug: category.slug, description: category.description } : null;
};

const toAuthor = (id) => {
  const author = seedData.users.find((item) => item.id === id);
  return author ? { name: author.name, avatar: author.avatar, role: author.role } : { name: 'Quản trị viên' };
};

const toTags = (tagIds = []) =>
  tagIds
    .map((id) => seedData.tags.find((item) => item.id === id))
    .filter(Boolean)
    .map((tag) => ({ id: tag.id, name: tag.name, slug: tag.slug }));

const mapPost = (post) => ({
  ...post,
  category: toCategory(post.categoryId),
  author: toAuthor(post.authorId),
  tags: toTags(post.tagIds || [])
});

const trending = [...seedData.posts].sort((a, b) => b.views - a.views);

export const mockHome = {
  featured: seedData.posts.filter((post) => post.featured).slice(0, 4).map(mapPost),
  latest: [...seedData.posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).slice(0, 8).map(mapPost),
  trending: trending.slice(0, 6).map(mapPost),
  categories: seedData.categories,
  banners: seedData.banners,
  videos: seedData.videos,
  gallery: seedData.gallery,
  ads: seedData.ads,
  stats: {
    views: seedData.posts.reduce((sum, post) => sum + post.views, 0),
    posts: seedData.posts.length
  }
};
