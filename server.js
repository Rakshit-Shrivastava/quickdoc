const express = require('express');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
const {convertToPDF} = require('./convertToPDF');

const port = process.env.PORT || 3000;
const app = express();
// app.use('static', express.static('public'));
app.use(express.static(__dirname + '/public'));
const upload = multer({ dest: 'uploads/' });

app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.post('/convert', upload.array('pdf', 1), async (req, res) => {
  await convertToPDF(req.files[0]);
  res.download(`public/${path.parse(req.files[0].originalname).name}.pdf`, function(err) {
    if (err) {
      console.log(err);
    }
    fs.unlinkSync(`public/${path.parse(req.files[0].originalname).name}.pdf`)
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})