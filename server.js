const express = require('express');
// const multer = require('multer');
const path = require('path');
// const fs = require('fs');
// const { convertToPDF } = require('./convertToPDF');

// Declaring PORT for local and live server
const port = process.env.PORT || 3000;
const app = express();

// Declaring static folder
app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));
// const upload = multer({ dest: 'uploads/' });

// API for serving HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// API for converting a document file to PDF file
// app.post('/convert', upload.array('pdf', 1), async (req, res) => {
//   convertToPDF(req.files[0]);
//   // Downloading converted PDF file to client's machine
//   res.download(`public/${path.parse(req.files[0].originalname).name}.pdf`, function (err) {
//     if (err) {
//       console.log("Internal server error: ", err);
//     }
//     // Deleting the stored file from public and uploads folder
//     fs.unlinkSync(`public/${path.parse(req.files[0].originalname).name}.pdf`);
//     fs.unlinkSync(`uploads/${req.files[0].filename}`);
//   });

// });

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})