import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../components/SectionTitle';

export default function About() {
  return (
    <section className="page prose">
      <Helmet><title>Giới thiệu | H’Mông Việt News</title></Helmet>
      <SectionTitle eyebrow="Giới thiệu" title="Về H’Mông Việt News" subtitle="Sứ mệnh bảo tồn và lan tỏa giá trị văn hóa H’Mông." />
      <p>H’Mông Việt News là không gian tin tức và tư liệu hiện đại dành cho bạn đọc yêu văn hóa vùng cao Việt Nam.</p>
      <p>Chúng tôi tập trung vào nội dung có chiều sâu, hình ảnh đẹp, bố cục dễ đọc và trải nghiệm tối ưu trên điện thoại lẫn máy tính.</p>
      <h3>Sứ mệnh</h3>
      <p>Bảo tồn, giới thiệu và kết nối các giá trị sống của người H’Mông với độc giả trẻ, du khách và cộng đồng nghiên cứu văn hóa.</p>
      <h3>Đội ngũ phát triển</h3>
      <p>Biên tập viên, nhà thiết kế giao diện và kỹ sư phần mềm cùng xây dựng website theo hướng báo điện tử hiện đại.</p>
    </section>
  );
}
