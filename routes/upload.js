const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.post('/upload-image', upload.single('image'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ success: false, message: 'Image not uploaded' });
  }

  res.status(200).json({ success: true, url: req.file.path });
});

module.exports = router;
