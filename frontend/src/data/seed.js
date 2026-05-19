export const seedData = {
  users: [
    {
      id: 1,
      name: 'Quản trị viên',
      email: 'admin@hmongvietnews.vn',
      role: 'admin',
      avatar: '/images/admin-avatar.svg',
      bio: 'Biên tập viên quản trị nội dung của H’Mông Việt News.',
      createdAt: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 2,
      name: 'Biên tập viên',
      email: 'editor@hmongvietnews.vn',
      role: 'editor',
      avatar: '/images/editor-avatar.svg',
      bio: 'Phụ trách chuyên mục văn hóa, lễ hội và du lịch vùng cao.',
      createdAt: '2026-01-01T00:00:00.000Z'
    },
    {
      id: 3,
      name: 'Bạn đọc mẫu',
      email: 'user@hmongvietnews.vn',
      role: 'user',
      avatar: '/images/user-avatar.svg',
      bio: 'Bạn đọc thường xuyên của website.',
      createdAt: '2026-01-01T00:00:00.000Z'
    }
  ],
  categories: [
    { id: 1, name: 'Văn hóa H’Mông', slug: 'van-hoa-hmong', description: 'Bản sắc, phong tục, đời sống và câu chuyện cộng đồng.', createdAt: '2026-01-01T00:00:00.000Z' },
    { id: 2, name: 'Lễ hội truyền thống', slug: 'le-hoi-truyen-thong', description: 'Tết H’Mông, Gầu Tào, chợ phiên và mùa lễ hội.', createdAt: '2026-01-01T00:00:00.000Z' },
    { id: 3, name: 'Ẩm thực', slug: 'am-thuc', description: 'Món ngon vùng cao và câu chuyện sau mỗi bữa ăn.', createdAt: '2026-01-01T00:00:00.000Z' },
    { id: 4, name: 'Trang phục dân tộc', slug: 'trang-phuc-dan-toc', description: 'Váy áo thổ cẩm, kỹ thuật thêu và sắc màu truyền thống.', createdAt: '2026-01-01T00:00:00.000Z' },
    { id: 5, name: 'Nhạc cụ dân gian', slug: 'nhac-cu-dan-gian', description: 'Khèn, sáo, đàn môi và nghệ thuật diễn tấu.', createdAt: '2026-01-01T00:00:00.000Z' },
    { id: 6, name: 'Du lịch vùng cao', slug: 'du-lich-vung-cao', description: 'Điểm đến, trải nghiệm, homestay và cung đường đẹp.', createdAt: '2026-01-01T00:00:00.000Z' },
    { id: 7, name: 'Người H’Mông tiêu biểu', slug: 'nguoi-hmong-tieu-bieu', description: 'Nghệ nhân, thầy giáo, người trẻ và câu chuyện truyền cảm hứng.', createdAt: '2026-01-01T00:00:00.000Z' },
    { id: 8, name: 'Giáo dục & đời sống', slug: 'giao-duc-doi-song', description: 'Học tập, chuyển đổi số và thay đổi tích cực trong bản làng.', createdAt: '2026-01-01T00:00:00.000Z' },
    { id: 9, name: 'Tin tức mới', slug: 'tin-tuc-moi', description: 'Tin nhanh, cập nhật và sự kiện mới nhất.', createdAt: '2026-01-01T00:00:00.000Z' }
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
      coverImage: '/images/tet-hmong.svg',
      categoryId: 2,
      authorId: 1,
      videoUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE',
      featured: true,
      status: 'published',
      views: 1280,
      likes: 340,
      publishedAt: '2026-01-01T08:00:00.000Z',
      updatedAt: '2026-01-01T08:00:00.000Z',
      tagIds: [1, 7]
    },
    {
      id: 2,
      title: 'Khèn H’Mông: Âm thanh kể chuyện của núi rừng',
      slug: 'khen-hmong-am-thanh-ke-chuyen-cua-nui-rung',
      excerpt: 'Khèn H’Mông là nhạc cụ gắn với lễ hội, giao duyên và đời sống tinh thần của người H’Mông.',
      content: `<h2 id="cau-tao">Cấu tạo của khèn</h2><p>Khèn H’Mông được làm từ những ống trúc ghép cùng bầu gỗ, tạo nên âm thanh vừa vang vọng vừa mộc mạc. Đây là nhạc cụ có vai trò quan trọng trong lễ hội, cưới hỏi và sinh hoạt cộng đồng.</p><h2 id="nghe-thuat">Nghệ thuật trình diễn</h2><p>Người thổi khèn không chỉ tạo ra âm thanh mà còn biểu đạt bằng chuyển động cơ thể. Những bước nhảy, cú xoay và nhịp chân hòa cùng tiếng khèn tạo thành một ngôn ngữ nghệ thuật giàu cảm xúc.</p><h2 id="bao-ton">Bảo tồn và truyền dạy</h2><p>Trong đời sống hiện đại, việc học và truyền dạy khèn H’Mông giúp gìn giữ bản sắc và truyền cảm hứng cho thế hệ trẻ yêu văn hóa dân tộc.</p>`,
      coverImage: '/images/khen-hmong.svg',
      categoryId: 5,
      authorId: 2,
      videoUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U',
      featured: true,
      status: 'published',
      views: 940,
      likes: 260,
      publishedAt: '2026-02-12T09:00:00.000Z',
      updatedAt: '2026-02-12T09:00:00.000Z',
      tagIds: [2, 7]
    },
    {
      id: 3,
      title: 'Váy thổ cẩm H’Mông: Tinh hoa trên từng đường kim mũi chỉ',
      slug: 'vay-tho-cam-hmong-tinh-hoa-tren-tung-duong-kim-mui-chi',
      excerpt: 'Trang phục H’Mông nổi bật với kỹ thuật thêu, dệt và hoa văn mang nhiều lớp nghĩa văn hóa.',
      content: `<h2 id="hoa-van">Hoa văn và kỹ thuật</h2><p>Hoa văn trên váy áo H’Mông thường lấy cảm hứng từ thiên nhiên, hoa lá, ruộng bậc thang và tín ngưỡng dân gian. Kỹ thuật tạo hình đòi hỏi sự kiên nhẫn, khéo léo và kinh nghiệm tích lũy qua nhiều thế hệ.</p><h2 id="mau-sac">Màu sắc và chất liệu</h2><p>Những gam màu nổi bật như đỏ, chàm, trắng và xanh được phối hợp hài hòa. Mỗi bộ trang phục không chỉ đẹp mắt mà còn phản ánh bản sắc vùng miền và sự tinh tế trong thẩm mỹ.</p><h2 id="song-hoi-nhap">Sống trong đời sống hôm nay</h2><p>Nhiều nghệ nhân và nhóm sáng tạo trẻ đang đưa thổ cẩm H’Mông vào thiết kế hiện đại, giúp trang phục truyền thống bước tiếp trong đời sống đương đại.</p>`,
      coverImage: '/images/vay-tho-cam.svg',
      categoryId: 4,
      authorId: 1,
      videoUrl: '',
      featured: true,
      status: 'published',
      views: 820,
      likes: 189,
      publishedAt: '2026-03-05T10:30:00.000Z',
      updatedAt: '2026-03-05T10:30:00.000Z',
      tagIds: [3, 7]
    },
    {
      id: 4,
      title: 'Chợ tình vùng cao: Nơi hẹn ước và gặp gỡ',
      slug: 'cho-tinh-vung-cao-noi-hen-uoc-va-gap-go',
      excerpt: 'Chợ tình là không gian văn hóa đặc biệt, nơi con người gặp nhau, giao lưu và gìn giữ phong tục truyền thống.',
      content: `<h2 id="khong-gian">Không gian của chợ tình</h2><p>Chợ tình ở vùng cao là một nét văn hóa đặc biệt, nơi trai gái gặp gỡ, trao đổi hàng hóa, hát đối và giao lưu tình cảm trong bầu không khí sinh hoạt cộng đồng.</p><h2 id="du-lich">Điểm đến của du khách</h2><p>Nhiều chợ phiên vùng cao còn là nơi du khách cảm nhận nhịp sống bản địa, thưởng thức ẩm thực và chụp ảnh cùng không gian núi rừng đặc trưng.</p><h2 id="gia-tri">Giá trị bảo tồn</h2><p>Giữ gìn chợ tình là giữ gìn ký ức văn hóa, đồng thời tạo cơ hội phát triển du lịch bền vững cho cộng đồng địa phương.</p>`,
      coverImage: '/images/cho-tinh.svg',
      categoryId: 2,
      authorId: 2,
      videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk',
      featured: true,
      status: 'published',
      views: 1560,
      likes: 430,
      publishedAt: '2026-03-22T06:45:00.000Z',
      updatedAt: '2026-03-22T06:45:00.000Z',
      tagIds: [4, 8]
    },
    {
      id: 5,
      title: 'Ẩm thực vùng cao H’Mông: Mộc mạc mà đậm đà',
      slug: 'am-thuc-vung-cao-hmong-moc-mac-ma-dam-da',
      excerpt: 'Từ thắng cố đến mèn mén, ẩm thực H’Mông là câu chuyện của khí hậu, đất đai và sự sáng tạo.',
      content: `<h2 id="nguyen-lieu">Nguyên liệu bản địa</h2><p>Ẩm thực vùng cao H’Mông thường tận dụng nguyên liệu địa phương như ngô, rau rừng, thịt, gia vị bản địa và phương pháp chế biến đơn giản nhưng đậm đà.</p><h2 id="mon-an">Món ăn tiêu biểu</h2><p>Mèn mén, bánh dày, thắng cố và rượu ngô là những món ăn nổi bật, phản ánh sự thích nghi của con người với môi trường tự nhiên khắc nghiệt.</p><h2 id="ban-sac">Bản sắc trên mâm cơm</h2><p>Mỗi bữa ăn là sự kết nối giữa lao động, mùa vụ và tinh thần cộng đồng, làm nên sức sống bền bỉ của văn hóa ẩm thực vùng cao.</p>`,
      coverImage: '/images/am-thuc.svg',
      categoryId: 3,
      authorId: 3,
      videoUrl: '',
      featured: true,
      status: 'published',
      views: 910,
      likes: 145,
      publishedAt: '2026-04-08T12:00:00.000Z',
      updatedAt: '2026-04-08T12:00:00.000Z',
      tagIds: [5, 7]
    },
    {
      id: 6,
      title: 'Nhà trình tường H’Mông: Kiến trúc bền chắc giữa núi cao',
      slug: 'nha-trinh-tuong-hmong-kien-truc-ben-chac-giua-nui-cao',
      excerpt: 'Nhà trình tường là giải pháp cư trú thích nghi với khí hậu, địa hình và nếp sống của người H’Mông.',
      content: `<h2 id="vat-lieu">Vật liệu và kỹ thuật</h2><p>Nhà trình tường được dựng bằng đất nện, mái ngói hoặc lợp gỗ, giúp giữ ấm mùa đông, mát mùa hè và chống chọi với thời tiết khắc nghiệt.</p><h2 id="khong-gian">Không gian sống</h2><p>Mỗi ngôi nhà thường gắn với sân, bếp, nơi tiếp khách và khu sinh hoạt của các thế hệ trong gia đình, tạo nên nhịp sống gần gũi, bền chặt.</p><h2 id="bao-ton">Bảo tồn di sản kiến trúc</h2><p>Những ngôi nhà trình tường còn lại ngày nay được xem là di sản sống, vừa phục vụ đời sống thường nhật vừa thu hút khách du lịch.</p>`,
      coverImage: '/images/nha-trinh-tuong.svg',
      categoryId: 6,
      authorId: 1,
      videoUrl: '',
      featured: false,
      status: 'published',
      views: 760,
      likes: 112,
      publishedAt: '2026-04-18T07:20:00.000Z',
      updatedAt: '2026-04-18T07:20:00.000Z',
      tagIds: [6, 8]
    },
    {
      id: 7,
      title: 'Nghệ nhân trẻ H’Mông giữ lửa văn hóa bằng sáng tạo số',
      slug: 'nghe-nhan-tre-hmong-giu-lua-van-hoa-bang-sang-tao-so',
      excerpt: 'Thế hệ trẻ H’Mông đang đưa thổ cẩm, âm nhạc và câu chuyện bản làng lên môi trường số.',
      content: `<h2 id="thoi-dai-so">Trong thời đại số</h2><p>Nhiều nghệ nhân và người trẻ H’Mông đã dùng mạng xã hội, video ngắn và thương mại điện tử để giới thiệu sản phẩm, câu chuyện và tri thức bản địa.</p><h2 id="co-hoi">Cơ hội phát triển</h2><p>Các lớp học trực tuyến, truyền thông số và mô hình du lịch cộng đồng đang mở ra cơ hội để văn hóa truyền thống đến gần hơn với công chúng.</p><h2 id="tuong-lai">Hướng tới tương lai</h2><p>Sự kết hợp giữa gìn giữ và đổi mới giúp bản sắc H’Mông không đứng yên mà tiếp tục sống động trong đời sống đương đại.</p>`,
      coverImage: '/images/banner-1.svg',
      categoryId: 7,
      authorId: 2,
      videoUrl: '',
      featured: false,
      status: 'published',
      views: 520,
      likes: 96,
      publishedAt: '2026-05-02T09:15:00.000Z',
      updatedAt: '2026-05-02T09:15:00.000Z',
      tagIds: [7, 8]
    },
    {
      id: 8,
      title: 'Du lịch vùng cao H’Mông: Chậm lại để hiểu một miền văn hóa',
      slug: 'du-lich-vung-cao-hmong-cham-lai-de-hieu-mot-mien-van-hoa',
      excerpt: 'Một hành trình du lịch đẹp là hành trình tôn trọng văn hóa, con người và nhịp sống địa phương.',
      content: `<h2 id="hanh-trinh">Hành trình khám phá</h2><p>Du lịch vùng cao không chỉ là ngắm cảnh mà còn là cách lắng nghe câu chuyện của người dân, thưởng thức ẩm thực và trải nghiệm nghề truyền thống.</p><h2 id="ton-trong">Du lịch có trách nhiệm</h2><p>Tôn trọng không gian sinh hoạt, mua sản phẩm thủ công và hạn chế rác thải là những cách để chuyến đi trở nên bền vững hơn.</p><h2 id="cam-xuc">Giá trị cảm xúc</h2><p>Một miền núi đẹp không chỉ nằm ở cảnh sắc mà còn ở tình người, ở câu chuyện được chia sẻ trên mỗi cung đường.</p>`,
      coverImage: '/images/banner-2.svg',
      categoryId: 6,
      authorId: 3,
      videoUrl: '',
      featured: false,
      status: 'published',
      views: 680,
      likes: 88,
      publishedAt: '2026-05-10T11:00:00.000Z',
      updatedAt: '2026-05-10T11:00:00.000Z',
      tagIds: [8]
    }
  ],
  videos: [
    { id: 1, title: 'Tiếng khèn giữa mùa xuân', youtubeId: 'ysz5S6PUM-U', description: 'Không gian trình diễn khèn H’Mông.', categoryId: 5, featured: true, createdAt: '2026-02-14T00:00:00.000Z' },
    { id: 2, title: 'Không khí Tết H’Mông', youtubeId: 'M7lc1UVf-VE', description: 'Bản làng rộn ràng ngày đầu năm.', categoryId: 2, featured: true, createdAt: '2026-01-01T00:00:00.000Z' },
    { id: 3, title: 'Dệt váy thổ cẩm', youtubeId: 'jfKfPfyJRdk', description: 'Kỹ thuật thêu và dệt truyền thống.', categoryId: 4, featured: false, createdAt: '2026-03-08T00:00:00.000Z' },
    { id: 4, title: 'Du lịch cộng đồng vùng cao', youtubeId: 'dQw4w9WgXcQ', description: 'Trải nghiệm cùng bản làng H’Mông.', categoryId: 6, featured: false, createdAt: '2026-05-01T00:00:00.000Z' }
  ],
  gallery: [
    { id: 1, title: 'Núi đồi mùa xuân', imageUrl: '/images/gallery-1.svg', category: 'Phong cảnh', description: 'Sắc xanh của núi rừng vùng cao.' },
    { id: 2, title: 'Thổ cẩm rực rỡ', imageUrl: '/images/gallery-2.svg', category: 'Trang phục', description: 'Hoa văn và màu sắc truyền thống.' },
    { id: 3, title: 'Chợ phiên vùng cao', imageUrl: '/images/gallery-3.svg', category: 'Lễ hội', description: 'Nhịp sống sinh hoạt cộng đồng.' },
    { id: 4, title: 'Khèn và điệu múa', imageUrl: '/images/banner-1.svg', category: 'Âm nhạc', description: 'Nghệ thuật trình diễn giàu biểu cảm.' }
  ],
  banners: [
    { id: 1, title: 'H’Mông Việt News', subtitle: 'Tin tức · văn hóa · di sản · du lịch vùng cao', imageUrl: '/images/banner-1.svg', linkUrl: '/category/van-hoa-hmong', active: true },
    { id: 2, title: 'Bảo tồn bản sắc', subtitle: 'Lưu giữ tri thức bản địa bằng ngôn ngữ số', imageUrl: '/images/banner-2.svg', linkUrl: '/about', active: true }
  ],
  ads: [
    { id: 1, title: 'Quảng bá văn hóa H’Mông', imageUrl: '/images/ad-1.svg', linkUrl: '/about', active: true },
    { id: 2, title: 'Du lịch cộng đồng', imageUrl: '/images/gallery-3.svg', linkUrl: '/category/du-lich-vung-cao', active: true }
  ],
  comments: [
    { id: 1, postId: 1, name: 'Minh Châu', content: 'Bài viết rất hay và nhiều thông tin giá trị.', approved: true, createdAt: '2026-05-01T08:00:00.000Z' },
    { id: 2, postId: 1, name: 'Hồng Nhung', content: 'Mình thích phần giải thích về ý nghĩa văn hóa.', approved: true, createdAt: '2026-05-02T09:00:00.000Z' },
    { id: 3, postId: 2, name: 'Tuấn Anh', content: 'Khèn H’Mông thật sự rất cuốn hút.', approved: true, createdAt: '2026-05-03T10:00:00.000Z' }
  ],
  contacts: [
    { id: 1, name: 'Người đọc mẫu', email: 'reader@example.com', phone: '0900000000', message: 'Mình muốn tìm hiểu thêm về lễ hội H’Mông.', createdAt: '2026-05-05T12:00:00.000Z' }
  ],
  uploads: []
};
