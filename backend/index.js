const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const charMap = {
  "ч": "4",
  // Добавьте сюда другие замены по необходимости
};

function replaceChars(text) {
  return text.split('').map(ch => charMap[ch] || ch).join('');
}

app.post('/api/replace', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });
  res.json({ result: replaceChars(text) });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
