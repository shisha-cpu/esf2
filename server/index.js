const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json({ limit: '50mb' })); 
app.use(cors());

mongoose
  .connect('mongodb+srv://admin:wwwwww@cluster0.weppimj.mongodb.net/esf?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB connection successful'))
  .catch((err) => console.log('DB connection error:', err));


app.get('/data', (req, res) => {
  const dataPath = path.join(__dirname, 'data.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data.json:', err);
      return res.status(500).json({ message: 'Failed to read data' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/update-data', (req, res) => {
  const newData = req.body;
  const filePath = path.join(__dirname, 'data.json');

  fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing data.json:', err);
      return res.status(500).json({ message: 'Failed to update data' });
    }
    console.log('data.json updated successfully');
    res.json({ message: 'Data updated successfully' });
  });
});


const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
