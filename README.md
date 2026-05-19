# H’Mông Việt News

Website tin tức hiện đại về người H’Mông Việt Nam và văn hóa truyền thống dân tộc H’Mông.

## Điểm nổi bật
- React + Vite, responsive cho điện thoại và máy tính
- Firebase Authentication cho đăng nhập / đăng ký bằng email và Google
- Bộ dữ liệu demo nội dung, bình luận, bookmark, quản lý bài viết ngay trong trình duyệt
- Admin panel đầy đủ giao diện quản trị
- Tối ưu cho Vercel và dễ mở rộng sang backend riêng sau này

## Cấu trúc
- `frontend/`: giao diện chính, Firebase Auth, local demo content store, admin panel
- `backend/`: mã nguồn Express cũ để mở rộng hoặc chuyển sang MySQL nếu cần
- `database/`: schema và seed MySQL tham khảo
- `uploads/`: tài nguyên minh họa mẫu

## Chạy nhanh
1. Vào thư mục `frontend`
2. Cài package:
   ```bash
   npm install
   ```
3. Copy `frontend/.env.example` thành `.env`
4. Chạy dev server:
   ```bash
   npm run dev
   ```

Mở `http://localhost:5173`

## Firebase cần bật
Trong Firebase Console, hãy bật:
- Authentication
  - Email/Password
  - Google
- Realtime Database (nếu bạn muốn mở rộng lưu dữ liệu về sau)

## Tài khoản mẫu
- Admin: `admin@hmongvietnews.vn`
- Editor: `editor@hmongvietnews.vn`
- User: `user@hmongvietnews.vn`

## Deploy Vercel
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Ghi chú
- Frontend hiện tại hoạt động độc lập bằng Firebase Auth + kho dữ liệu demo nội bộ.
- Bạn có thể thay phần demo store bằng Realtime Database hoặc MySQL khi cần mở rộng.
