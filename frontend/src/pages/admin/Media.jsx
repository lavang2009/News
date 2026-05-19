import React, { useState } from 'react';
import { api } from '../../api/client';
import SectionTitle from '../../components/SectionTitle';

export default function AdminMedia() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [preview, setPreview] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const data = await api.upload('/upload', formData);
      setResult(`Đã tải lên: ${data.file.path}`);
      setPreview(data.file.path);
    } catch (error) {
      setResult(error.message);
    }
  };

  return (
    <div>
      <SectionTitle eyebrow="Admin" title="Upload media" />
      <form className="form-grid panel" onSubmit={submit}>
        <input type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button className="btn btn-primary">Tải lên</button>
      </form>
      {result && <p className="form-message">{result}</p>}
      {preview && (
        <div className="panel">
          <strong>Đường dẫn file</strong>
          <p>{preview}</p>
        </div>
      )}
    </div>
  );
}
