USE hmong_viet_news;

INSERT INTO users (name, email, password_hash, role, avatar, bio) VALUES
('Quản trị viên', 'admin@hmongvietnews.vn', '$2b$10$T5Z4dZ7w3Z5U6m2c5A3G8e7Kc4D1ZV0O6jY6QjQXo5n4p7jN2ZKp2W', 'admin', '/uploads/admin-avatar.svg', 'Biên tập viên quản trị nội dung của H’Mông Việt News'),
('Biên tập viên', 'editor@hmongvietnews.vn', '$2b$10$T5Z4dZ7w3Z5U6m2c5A3G8e7Kc4D1ZV0O6jY6QjQXo5n4p7jN2ZKp2W', 'editor', '/uploads/editor-avatar.svg', 'Phụ trách chuyên mục văn hóa và du lịch'),
('Người dùng mẫu', 'user@hmongvietnews.vn', '$2b$10$T5Z4dZ7w3Z5U6m2c5A3G8e7Kc4D1ZV0O6jY6QjQXo5n4p7jN2ZKp2W', 'user', '/uploads/user-avatar.svg', 'Bạn đọc thường xuyên của website');

INSERT INTO categories (name, slug, description) VALUES
('Văn hóa H’Mông', 'van-hoa-hmong', 'Trang viết về đời sống văn hóa, phong tục và giá trị bản sắc'),
('Lễ hội truyền thống', 'le-hoi-truyen-thong', 'Tết H’Mông, Gầu Tào, chợ phiên và các lễ hội vùng cao'),
('Ẩm thực', 'am-thuc', 'Món ngon vùng cao, nguyên liệu và cách chế biến'),
('Trang phục dân tộc', 'trang-phuc-dan-toc', 'Váy áo thổ cẩm, kỹ thuật dệt, nhuộm chàm và hoa văn'),
('Nhạc cụ dân gian', 'nhac-cu-dan-gian', 'Khèn, sáo, đàn môi và âm thanh của núi rừng'),
('Du lịch vùng cao', 'du-lich-vung-cao', 'Điểm đến, trải nghiệm và câu chuyện con người');

INSERT INTO tags (name, slug) VALUES
('Tết H’Mông', 'tet-hmong'),
('Khèn H’Mông', 'khen-hmong'),
('Váy thổ cẩm', 'vay-tho-cam'),
('Chợ tình', 'cho-tinh'),
('Ẩm thực vùng cao', 'am-thuc-vung-cao'),
('Nhà trình tường', 'nha-trinh-tuong'),
('Di sản', 'di-san'),
('Du lịch', 'du-lich');

INSERT INTO posts (title, slug, excerpt, content, cover_image, category_id, author_id, video_url, featured, status, views, likes, published_at) VALUES
('Tết H’Mông: Nhịp mùa mới trên triền núi', 'tet-hmong-nhip-mua-moi-tren-trien-nui', 'Tết H’Mông là thời khắc sum vầy, tạ ơn đất trời và mở ra một năm mới đầy hy vọng.', '<h2 id="tet-hmong-la-gi">Tết H’Mông là gì?</h2><p>Tết H’Mông là một trong những lễ Tết quan trọng nhất của đồng bào H’Mông ở Việt Nam. Đây là dịp nghỉ ngơi sau mùa vụ, gắn kết gia đình, tưởng nhớ tổ tiên và gửi gắm ước vọng tốt lành cho năm mới.</p><h2 id="khong-gian-le-tet">Không gian lễ Tết</h2><p>Trong những ngày Tết, bản làng rộn ràng tiếng khèn, tiếng sáo và sắc màu trang phục truyền thống. Mâm cỗ ngày Tết thường có các món ăn đặc trưng của vùng cao, được chuẩn bị cẩn thận để đón khách và sum họp người thân.</p><h2 id="y-nghia">Ý nghĩa văn hóa</h2><p>Tết H’Mông không chỉ là một nghi lễ, mà còn là sợi dây gắn kết cộng đồng, gìn giữ ký ức tập thể và truyền trao giá trị văn hóa từ thế hệ này sang thế hệ khác.</p>', '/uploads/tet-hmong.svg', 2, 1, 'https://www.youtube.com/embed/5qap5aO4i9A', 1, 'published', 1280, 340, '2026-01-01 08:00:00'),
('Khèn H’Mông: Âm thanh kể chuyện của núi rừng', 'khen-hmong-am-thanh-ke-chuyen-cua-nui-rung', 'Khèn H’Mông là nhạc cụ gắn với lễ hội, giao duyên và cả đời sống tinh thần của người H’Mông.', '<h2 id="goc-nhac-cu">Nguồn gốc và cấu tạo</h2><p>Khèn H’Mông được làm từ những ống trúc ghép cùng bầu gỗ, tạo nên âm thanh vừa vang vọng vừa mộc mạc. Đây là nhạc cụ có vai trò rất quan trọng trong các dịp lễ hội, cưới hỏi và sinh hoạt cộng đồng.</p><h2 id="nghe-thuat-trinh-dien">Nghệ thuật trình diễn</h2><p>Người thổi khèn không chỉ tạo ra âm thanh mà còn biểu đạt bằng chuyển động cơ thể. Những bước nhảy, cú xoay và nhịp chân hòa cùng tiếng khèn tạo thành một ngôn ngữ nghệ thuật giàu cảm xúc.</p><h2 id="gia-tri">Giá trị bảo tồn</h2><p>Trong đời sống hiện đại, việc học và truyền dạy khèn H’Mông giúp gìn giữ bản sắc và truyền cảm hứng cho thế hệ trẻ yêu văn hóa dân tộc.</p>', '/uploads/khen-hmong.svg', 5, 2, null, 1, 'published', 940, 260, '2026-02-12 09:00:00'),
('Váy thổ cẩm H’Mông: Tinh hoa trên từng đường kim mũi chỉ', 'vay-tho-cam-hmong-tinh-hoa-tren-tung-duong-kim-mui-chi', 'Trang phục H’Mông nổi bật với kỹ thuật thêu, dệt và hoa văn mang nhiều lớp nghĩa văn hóa.', '<h2 id="hoa-van">Hoa văn và kỹ thuật</h2><p>Hoa văn trên váy áo H’Mông thường lấy cảm hứng từ thiên nhiên, hoa lá, ruộng bậc thang và tín ngưỡng dân gian. Kỹ thuật tạo hình đòi hỏi sự kiên nhẫn, khéo léo và kinh nghiệm tích lũy qua nhiều thế hệ.</p><h2 id="mau-sac">Màu sắc và chất liệu</h2><p>Những gam màu nổi bật như đỏ, chàm, trắng và xanh được phối hợp hài hòa. Mỗi bộ trang phục không chỉ đẹp mắt mà còn phản ánh bản sắc vùng miền và sự tinh tế trong thẩm mỹ.</p><h2 id="song-hoi-nhap">Sống trong đời sống hôm nay</h2><p>Nhiều nghệ nhân và nhóm sáng tạo trẻ đang đưa thổ cẩm H’Mông vào thiết kế hiện đại, giúp trang phục truyền thống bước tiếp trong đời sống đương đại.</p>', '/uploads/vay-tho-cam.svg', 4, 1, null, 1, 'published', 820, 189, '2026-03-05 10:30:00'),
('Chợ tình vùng cao: Nơi hẹn ước và gặp gỡ', 'cho-tinh-vung-cao-noi-hen-uoc-va-gap-go', 'Chợ tình là không gian văn hóa đặc biệt, nơi con người gặp nhau, giao lưu và gìn giữ phong tục truyền thống.', '<p>Chợ tình ở vùng cao là một nét văn hóa đặc biệt, nơi trai gái gặp gỡ, trao đổi hàng hóa, hát đối và giao lưu tình cảm trong bầu không khí sinh hoạt cộng đồng.</p><p>Nhiều chợ phiên vùng cao còn là nơi du khách cảm nhận nhịp sống bản địa, thưởng thức ẩm thực và chụp ảnh cùng không gian núi rừng đặc trưng.</p>', '/uploads/cho-tinh.svg', 2, 2, null, 1, 'published', 1560, 430, '2026-03-22 06:45:00'),
('Ẩm thực vùng cao H’Mông: Mộc mạc mà đậm đà', 'am-thuc-vung-cao-hmong-moc-mac-ma-dam-da', 'Từ thắng cố đến mèn mén, ẩm thực H’Mông là câu chuyện của khí hậu, đất đai và sự sáng tạo.', '<p>Ẩm thực vùng cao H’Mông thường tận dụng nguyên liệu địa phương như ngô, rau rừng, thịt, gia vị bản địa và phương pháp chế biến đơn giản nhưng đậm đà.</p><p>Mèn mén, bánh dày, thắng cố và rượu ngô là những món ăn nổi bật, phản ánh sự thích nghi của con người với môi trường tự nhiên khắc nghiệt.</p>', '/uploads/am-thuc.svg', 3, 3, null, 1, 'published', 910, 145, '2026-04-08 12:00:00'),
('Nhà trình tường: Kiến trúc bền vững giữa núi đá', 'nha-trinh-tuong-kien-truc-ben-vung-giua-nui-da', 'Nhà trình tường là kiểu nhà truyền thống đặc trưng, phù hợp với khí hậu và điều kiện tự nhiên vùng cao.', '<p>Nhà trình tường được tạo từ đất nện, dày, chắc và giữ nhiệt tốt. Kiểu kiến trúc này cho thấy sự sáng tạo của cư dân vùng cao trong việc thích nghi với môi trường sống.</p><p>Không chỉ là nơi ở, nhà trình tường còn là không gian sinh hoạt, lưu giữ ký ức gia đình và cộng đồng.</p>', '/uploads/nha-trinh-tuong.svg', 6, 1, null, 0, 'published', 760, 120, '2026-04-20 07:15:00');

INSERT INTO post_tags (post_id, tag_id) VALUES
(1,1),(1,7),
(2,2),(2,7),
(3,3),(3,7),
(4,4),(4,8),
(5,5),(5,7),
(6,6),(6,7);

INSERT INTO videos (title, youtube_id, description, category_id, featured) VALUES
('Không gian văn hóa Tết H’Mông', '5qap5aO4i9A', 'Video giới thiệu không khí đón Tết trên các bản làng vùng cao.', 2, 1),
('Tiếng khèn trên đỉnh núi', 'dQw4w9WgXcQ', 'Một góc nhìn gần hơn về nhạc cụ truyền thống H’Mông.', 5, 0);

INSERT INTO gallery (title, image_url, category, description) VALUES
('Trang phục H’Mông sắc màu', '/uploads/gallery-1.svg', 'Trang phục dân tộc', 'Bộ sưu tập sắc màu thổ cẩm trên nền núi rừng.'),
('Lễ hội mùa xuân', '/uploads/gallery-2.svg', 'Lễ hội truyền thống', 'Khoảnh khắc rực rỡ trong ngày hội vùng cao.'),
('Nhà trình tường', '/uploads/gallery-3.svg', 'Du lịch vùng cao', 'Kiến trúc đất nện bền bỉ của người H’Mông.');

INSERT INTO banners (title, subtitle, image_url, link_url, active) VALUES
('Khám phá văn hóa H’Mông Việt Nam', 'Tin tức, câu chuyện và di sản sống của vùng cao', '/uploads/banner-1.svg', '/category/van-hoa-hmong', 1),
('Sắc màu thổ cẩm giữa đại ngàn', 'Phong cách tối giản, hiện đại, giàu bản sắc', '/uploads/banner-2.svg', '/category/trang-phuc-dan-toc', 1);

INSERT INTO ads (title, image_url, link_url, active) VALUES
('Du lịch Tây Bắc cùng bản sắc H’Mông', '/uploads/ad-1.svg', 'https://example.com', 1);

INSERT INTO contacts (name, email, phone, message) VALUES
('Khách đọc mẫu', 'reader@example.com', '0900000000', 'Xin chào, tôi muốn hợp tác nội dung về văn hóa H’Mông.');
