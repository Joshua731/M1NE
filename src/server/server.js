const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'wins.json');
console.log(DATA_FILE);

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Minesweeper backend running');
});

app.post('/saveWin', (req, res) => {
    const newWin = req.body;
    fs.readFile(DATA_FILE, (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ error: 'Failed to read data file' });
    }
    
    const wins = data ? JSON.parse(data) : [];

    wins.push(newWin);

    fs.writeFile(DATA_FILE, JSON.stringify(wins, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write data file' });
      }
      res.status(200).json({ message: 'Win saved successfully' });
    });
  });
});

app.get('/ranking', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
      if (err && err.code === 'ENOENT') {
        return res.json([]);
      } else if (err) {
        return res.status(500).json({ error: 'Failed to read data file' });
      }
  
      try {
        const wins = JSON.parse(data) || [];
        res.json(wins);
      } catch (parseError) {
        res.status(500).json({ error: 'Failed to parse data file' });
      }
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});