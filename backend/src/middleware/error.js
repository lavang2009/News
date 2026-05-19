export const notFound = (req, res) => {
  res.status(404).json({ message: 'Không tìm thấy API.' });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Lỗi hệ thống.',
    detail: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
