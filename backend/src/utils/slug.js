import slugify from 'slugify';

export const makeSlug = (value = '') =>
  slugify(value, { lower: true, strict: true, locale: 'vi' }).replace(/-+/g, '-');
