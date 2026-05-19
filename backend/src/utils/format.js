export const paginate = ({ page = 1, limit = 10, total = 0 }) => {
  const currentPage = Math.max(1, Number(page) || 1);
  const perPage = Math.max(1, Number(limit) || 10);
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  return {
    page: currentPage,
    limit: perPage,
    total,
    totalPages,
    offset: (currentPage - 1) * perPage
  };
};

export const stripHtml = (input = '') => input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
