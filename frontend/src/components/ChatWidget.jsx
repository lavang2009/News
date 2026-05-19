import React, { useState } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <strong>Hỗ trợ bạn đọc</strong>
            <button onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="chat-body">
            <p>Xin chào! H’Mông Việt News có thể hỗ trợ bạn tìm bài viết, video hoặc thông tin liên hệ.</p>
            {message && <p className="chat-user">{message}</p>}
            <p className="chat-bot">Hãy nhập nội dung cần tìm ở thanh search phía trên để xem kết quả nhanh nhất.</p>
          </div>
          <form className="chat-form" onSubmit={(e) => { e.preventDefault(); setMessage('Đã nhận: ' + message); }}>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Nhập câu hỏi..." />
            <button className="btn btn-primary">Gửi</button>
          </form>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setOpen((v) => !v)} aria-label="Chat hỗ trợ">💬</button>
    </div>
  );
}
