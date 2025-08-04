const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 83;

app.use(cors());
app.use(express.json());

// API endpoint
const charMap = { "ч": "4" };
function replaceChars(text) {
  return text.split('').map(ch => charMap[ch] || ch).join('');
}
app.post('/api/replace', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });
  res.json({ result: replaceChars(text) });
});

// Статика для frontend
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
