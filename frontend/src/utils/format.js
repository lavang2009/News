export const formatDate = (value) => {
  if (!value) return '';
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(value));
};

export const formatNumber = (value) => new Intl.NumberFormat('vi-VN').format(Number(value || 0));

export const readingTime = (content = '') => {
  const words = String(content).replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
};
