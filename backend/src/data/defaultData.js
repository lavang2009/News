import bcrypt from 'bcryptjs';

const passwordHash = bcrypt.hashSync('Admin@123456', 10);

export const createDefaultData = () => ({
  users: [
    { id: 1, name: 'Quản trị viên', email: 'admin@hmongvietnews.vn', passwordHash, role: 'admin', avatar: '/uploads/admin-avatar.svg', bio: 'Biên tập viên quản trị nội dung của H’Mông Việt News', createdAt: new Date('2026-01-01').toISOString() },
    { id: 2, name: 'Biên tập viên', email: 'editor@hmongvietnews.vn', passwordHash, role: 'editor', avatar: '/uploads/editor-avatar.svg', bio: 'Phụ trách chuyên mục văn hóa và du lịch', createdAt: new Date('2026-01-01').toISOString() },
    { id: 3, name: 'Người dùng mẫu', email: 'user@hmongvietnews.vn', passwordHash, role: 'user', avatar: '/uploads/user-avatar.svg', bio: 'Bạn đọc thường xuyên của website', createdAt: new Date('2026-01-01').toISOString() }
  ],
  categories: [
    { id: 1, name: 'Văn hóa H’Mông', slug: 'van-hoa-hmong', description: 'Trang viết về đời sống văn hóa, phong tục và giá trị bản sắc', createdAt: new Date('2026-01-01').toISOString() },
    { id: 2, name: 'Lễ hội truyền thống', slug: 'le-hoi-truyen-thong', description: 'Tết H’Mông, Gầu Tào, chợ phiên và các lễ hội vùng cao', createdAt: new Date('2026-01-01').toISOString() },
    { id: 3, name: 'Ẩm thực', slug: 'am-thuc', description: 'Món ngon vùng cao, nguyên liệu và cách chế biến', createdAt: new Date('2026-01-01').toISOString() },
    { id: 4, name: 'Trang phục dân tộc', slug: 'trang-phuc-dan-toc', description: 'Váy áo thổ cẩm, kỹ thuật dệt, nhuộm chàm và hoa văn', createdAt: new Date('2026-01-01').toISOString() },
    { id: 5, name: 'Nhạc cụ dân gian', slug: 'nhac-cu-dan-gian', description: 'Khèn, sáo, đàn môi và âm thanh của núi rừng', createdAt: new Date('2026-01-01').toISOString() },
    { id: 6, name: 'Du lịch vùng cao', slug: 'du-lich-vung-cao', description: 'Điểm đến, trải nghiệm và câu chuyện con người', createdAt: new Date('2026-01-01').toISOString() }
  ],
  tags: [
    { id: 1, name: 'Tết H’Mông', slug: 'tet-hmong' },
    { id: 2, name: 'Khèn H’Mông', slug: 'khen-hmong' },
    { id: 3, name: 'Váy thổ cẩm', slug: 'vay-tho-cam' },
    { id: 4, name: 'Chợ tình', slug: 'cho-tinh' },
    { id: 5, name: 'Ẩm thực vùng cao', slug: 'am-thuc-vung-cao' },
    { id: 6, name: 'Nhà trình tường', slug: 'nha-trinh-tuong' },
    { id: 7, name: 'Di sản', slug: 'di-san' },
    { id: 8, name: 'Du lịch', slug: 'du-lich' }
  ],
  posts: [
    {
      id: 1,
      title: 'Tết H’Mông: Nhịp mùa mới trên triền núi',
      slug: 'tet-hmong-nhip-mua-moi-tren-trien-nui',
      excerpt: 'Tết H’Mông là thời khắc sum vầy, tạ ơn đất trời và mở ra một năm mới đầy hy vọng.',
      content: `<h2 id="tet-hmong-la-gi">Tết H’Mông là gì?</h2><p>Tết H’Mông là một trong những lễ Tết quan trọng nhất của đồng bào H’Mông ở Việt Nam. Đây là dịp nghỉ ngơi sau mùa vụ, gắn kết gia đình, tưởng nhớ tổ tiên và gửi gắm ước vọng tốt lành cho năm mới.</p><h2 id="khong-gian-le-tet">Không gian lễ Tết</h2><p>Trong những ngày Tết, bản làng rộn ràng tiếng khèn, tiếng sáo và sắc màu trang phục truyền thống. Mâm cỗ ngày Tết thường có các món ăn đặc trưng của vùng cao, được chuẩn bị cẩn thận để đón khách và sum họp người thân.</p><h2 id="y-nghia">Ý nghĩa văn hóa</h2><p>Tết H’Mông không chỉ là một nghi lễ, mà còn là sợi dây gắn kết cộng đồng, gìn giữ ký ức tập thể và truyền trao giá trị văn hóa từ thế hệ này sang thế hệ khác.</p>`,
      coverImage: '/uploads/tet-hmong.svg',
      categoryId: 2,
      authorId: 1,
      videoUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
      featured: true,
      status: 'published',
      views: 1280,
      likes: 340,
      publishedAt: '2026-01-01T08:00:00.000Z',
      updatedAt: '2026-01-01T08:00:00.000Z',
      tagIds: [1,7]
    },
    {
      id: 2,
      title: 'Khèn H’Mông: Âm thanh kể chuyện của núi rừng',
      slug: 'khen-hmong-am-thanh-ke-chuyen-cua-nui-rung',
      excerpt: 'Khèn H’Mông là nhạc cụ gắn với lễ hội, giao duyên và cả đời sống tinh thần của người H’Mông.',
      content: `<h2 id="goc-nhac-cu">Nguồn gốc và cấu tạo</h2><p>Khèn H’Mông được làm từ những ống trúc ghép cùng bầu gỗ, tạo nên âm thanh vừa vang vọng vừa mộc mạc. Đây là nhạc cụ có vai trò rất quan trọng trong các dịp lễ hội, cưới hỏi và sinh hoạt cộng đồng.</p><h2 id="nghe-thuat-trinh-dien">Nghệ thuật trình diễn</h2><p>Người thổi khèn không chỉ tạo ra âm thanh mà còn biểu đạt bằng chuyển động cơ thể. Những bước nhảy, cú xoay và nhịp chân hòa cùng tiếng khèn tạo thành một ngôn ngữ nghệ thuật giàu cảm xúc.</p><h2 id="gia-tri">Giá trị bảo tồn</h2><p>Trong đời sống hiện đại, việc học và truyền dạy khèn H’Mông giúp gìn giữ bản sắc và truyền cảm hứng cho thế hệ trẻ yêu văn hóa dân tộc.</p>`,
      coverImage: '/uploads/khen-hmong.svg',
      categoryId: 5,
      authorId: 2,
      videoUrl: '',
      featured: true,
      status: 'published',
      views: 940,
      likes: 260,
      publishedAt: '2026-02-12T09:00:00.000Z',
      updatedAt: '2026-02-12T09:00:00.000Z',
      tagIds: [2,7]
    },
    {
      id: 3,
      title: 'Váy thổ cẩm H’Mông: Tinh hoa trên từng đường kim mũi chỉ',
      slug: 'vay-tho-cam-hmong-tinh-hoa-tren-tung-duong-kim-mui-chi',
      excerpt: 'Trang phục H’Mông nổi bật với kỹ thuật thêu, dệt và hoa văn mang nhiều lớp nghĩa văn hóa.',
      content: `<h2 id="hoa-van">Hoa văn và kỹ thuật</h2><p>Hoa văn trên váy áo H’Mông thường lấy cảm hứng từ thiên nhiên, hoa lá, ruộng bậc thang và tín ngưỡng dân gian. Kỹ thuật tạo hình đòi hỏi sự kiên nhẫn, khéo léo và kinh nghiệm tích lũy qua nhiều thế hệ.</p><h2 id="mau-sac">Màu sắc và chất liệu</h2><p>Những gam màu nổi bật như đỏ, chàm, trắng và xanh được phối hợp hài hòa. Mỗi bộ trang phục không chỉ đẹp mắt mà còn phản ánh bản sắc vùng miền và sự tinh tế trong thẩm mỹ.</p><h2 id="song-hoi-nhap">Sống trong đời sống hôm nay</h2><p>Nhiều nghệ nhân và nhóm sáng tạo trẻ đang đưa thổ cẩm H’Mông vào thiết kế hiện đại, giúp trang phục truyền thống bước tiếp trong đời sống đương đại.</p>`,
      coverImage: '/uploads/vay-tho-cam.svg',
      categoryId: 4,
      authorId: 1,
      videoUrl: '',
      featured: true,
      status: 'published',
      views: 820,
      likes: 189,
      publishedAt: '2026-03-05T10:30:00.000Z',
      updatedAt: '2026-03-05T10:30:00.000Z',
      tagIds: [3,7]
    },
    {
      id: 4,
      title: 'Chợ tình vùng cao: Nơi hẹn ước và gặp gỡ',
      slug: 'cho-tinh-vung-cao-noi-hen-uoc-va-gap-go',
      excerpt: 'Chợ tình là không gian văn hóa đặc biệt, nơi con người gặp nhau, giao lưu và gìn giữ phong tục truyền thống.',
      content: `<p>Chợ tình ở vùng cao là một nét văn hóa đặc biệt, nơi trai gái gặp gỡ, trao đổi hàng hóa, hát đối và giao lưu tình cảm trong bầu không khí sinh hoạt cộng đồng.</p><p>Nhiều chợ phiên vùng cao còn là nơi du khách cảm nhận nhịp sống bản địa, thưởng thức ẩm thực và chụp ảnh cùng không gian núi rừng đặc trưng.</p>`,
      coverImage: '/uploads/cho-tinh.svg',
      categoryId: 2,
      authorId: 2,
      videoUrl: '',
      featured: true,
      status: 'published',
      views: 1560,
      likes: 430,
      publishedAt: '2026-03-22T06:45:00.000Z',
      updatedAt: '2026-03-22T06:45:00.000Z',
      tagIds: [4,8]
    },
    {
      id: 5,
      title: 'Ẩm thực vùng cao H’Mông: Mộc mạc mà đậm đà',
      slug: 'am-thuc-vung-cao-hmong-moc-mac-ma-dam-da',
      excerpt: 'Từ thắng cố đến mèn mén, ẩm thực H’Mông là câu chuyện của khí hậu, đất đai và sự sáng tạo.',
      content: `<p>Ẩm thực vùng cao H’Mông thường tận dụng nguyên liệu địa phương như ngô, rau rừng, thịt, gia vị bản địa và phương pháp chế biến đơn giản nhưng đậm đà.</p><p>Mèn mén, bánh dày, thắng cố và rượu ngô là những món ăn nổi bật, phản ánh sự thích nghi của con người với môi trường tự nhiên khắc nghiệt.</p>`,
      coverImage: '/uploads/am-thuc.svg',
      categoryId: 3,
      authorId: 3,
      videoUrl: '',
      featured: true,
      status: 'published',
      views: 910,
      likes: 145,
      publishedAt: '2026-04-08T12:00:00.000Z',
      updatedAt: '2026-04-08T12:00:00.000Z',
      tagIds: [5,7]
    },
    {
      id: 6,
      title: 'Nhà trình tường: Kiến trúc bền vững giữa núi đá',
      slug: 'nha-trinh-tuong-kien-truc-ben-vung-giua-nui-da',
      excerpt: 'Nhà trình tường là kiểu nhà truyền thống đặc trưng, phù hợp với khí hậu và điều kiện tự nhiên vùng cao.',
      content: `<p>Nhà trình tường được tạo từ đất nện, dày, chắc và giữ nhiệt tốt. Kiểu kiến trúc này cho thấy sự sáng tạo của cư dân vùng cao trong việc thích nghi với môi trường sống.</p><p>Không chỉ là nơi ở, nhà trình tường còn là không gian sinh hoạt, lưu giữ ký ức gia đình và cộng đồng.</p>`,
      coverImage: '/uploads/nha-trinh-tuong.svg',
      categoryId: 6,
      authorId: 1,
      videoUrl: '',
      featured: false,
      status: 'published',
      views: 760,
      likes: 120,
      publishedAt: '2026-04-20T07:15:00.000Z',
      updatedAt: '2026-04-20T07:15:00.000Z',
      tagIds: [6,7]
    }
  ],
  comments: [
    { id: 1, postId: 1, userId: 3, name: 'Người dùng mẫu', content: 'Bài viết rất hay và giàu cảm xúc.', approved: true, createdAt: new Date('2026-04-01').toISOString() },
    { id: 2, postId: 2, userId: 2, name: 'Biên tập viên', content: 'Âm thanh khèn thật đặc biệt.', approved: true, createdAt: new Date('2026-04-02').toISOString() }
  ],
  bookmarks: [
    { id: 1, userId: 3, postId: 1, createdAt: new Date('2026-04-03').toISOString() }
  ],
  videos: [
    { id: 1, title: 'Không gian văn hóa Tết H’Mông', youtubeId: '5qap5aO4i9A', description: 'Video giới thiệu không khí đón Tết trên các bản làng vùng cao.', categoryId: 2, featured: true, createdAt: new Date('2026-04-04').toISOString() },
    { id: 2, title: 'Tiếng khèn trên đỉnh núi', youtubeId: 'dQw4w9WgXcQ', description: 'Một góc nhìn gần hơn về nhạc cụ truyền thống H’Mông.', categoryId: 5, featured: false, createdAt: new Date('2026-04-05').toISOString() }
  ],
  gallery: [
    { id: 1, title: 'Trang phục H’Mông sắc màu', imageUrl: '/uploads/gallery-1.svg', category: 'Trang phục dân tộc', description: 'Bộ sưu tập sắc màu thổ cẩm trên nền núi rừng.', createdAt: new Date('2026-04-06').toISOString() },
    { id: 2, title: 'Lễ hội mùa xuân', imageUrl: '/uploads/gallery-2.svg', category: 'Lễ hội truyền thống', description: 'Khoảnh khắc rực rỡ trong ngày hội vùng cao.', createdAt: new Date('2026-04-07').toISOString() },
    { id: 3, title: 'Nhà trình tường', imageUrl: '/uploads/gallery-3.svg', category: 'Du lịch vùng cao', description: 'Kiến trúc đất nện bền bỉ của người H’Mông.', createdAt: new Date('2026-04-08').toISOString() }
  ],
  banners: [
    { id: 1, title: 'Khám phá văn hóa H’Mông Việt Nam', subtitle: 'Tin tức, câu chuyện và di sản sống của vùng cao', imageUrl: '/uploads/banner-1.svg', linkUrl: '/category/van-hoa-hmong', active: true },
    { id: 2, title: 'Sắc màu thổ cẩm giữa đại ngàn', subtitle: 'Phong cách tối giản, hiện đại, giàu bản sắc', imageUrl: '/uploads/banner-2.svg', linkUrl: '/category/trang-phuc-dan-toc', active: true }
  ],
  ads: [
    { id: 1, title: 'Du lịch Tây Bắc cùng bản sắc H’Mông', imageUrl: '/uploads/ad-1.svg', linkUrl: 'https://example.com', active: true }
  ],
  contacts: [
    { id: 1, name: 'Khách đọc mẫu', email: 'reader@example.com', phone: '0900000000', message: 'Xin chào, tôi muốn hợp tác nội dung về văn hóa H’Mông.', createdAt: new Date('2026-04-09').toISOString() }
  ]
});
