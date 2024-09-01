const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/musicdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;
conn.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('musicFile'), async (req, res) => {
  const bucket = new GridFSBucket(conn.db, { bucketName: 'music' });

  const uploadStream = bucket.openUploadStream(req.file.originalname, {
    contentType: req.file.mimetype,
  });
  
  uploadStream.end(req.file.buffer);

  uploadStream.on('finish', () => {
    res.status(200).json({ id: uploadStream.id });
  });

  uploadStream.on('error', (err) => {
    res.status(500).send('Error uploading music file');
  });
});

// Retrieve music file
app.get('/music/:id', async (req, res) => {
  const { id } = req.params;
  const bucket = new GridFSBucket(conn.db, { bucketName: 'music' });

  bucket.openDownloadStream(new mongoose.Types.ObjectId(id))
    .pipe(res)
    .on('error', () => {
      res.status(404).send('Music not found');
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
