import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('http://localhost:3001/api/replace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });
    const data = await res.json();
    setOutput(data.result || '');
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <h1 style={{ color: '#345', marginBottom: 16 }}>Текстовый преобразователь</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', minWidth: 320 }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Введите текст..."
          rows={4}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb', marginBottom: 12 }}
        />
        <button
          type="submit"
          style={{
            padding: 12,
            border: 'none',
            borderRadius: 6,
            background: '#4a90e2',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: 12
          }}
          disabled={loading}
        >
          {loading ? 'Обработка...' : 'Заменить'}
        </button>
        <textarea
          value={output}
          readOnly
          placeholder="Результат..."
          rows={4}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #bbb' }}
        />
      </form>
      <footer style={{ marginTop: 24, color: '#888' }}>
        &copy; 2025 Трансформер текста
      </footer>
    </div>
  );
}

export default App;
