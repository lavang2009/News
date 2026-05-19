export const uploadFile = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Chưa chọn file.' });
  res.json({
    file: {
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname,
      size: req.file.size
    }
  });
};
