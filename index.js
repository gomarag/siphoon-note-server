require('dotenv').config();
const express = require('express');
const https = require('https');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

const port = process.env.HTTPS_PORT || 80;

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Hello From SSL Server!😀');
});

// 랜딩페이지 접속 에러 시 서버에서 처리
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Router Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});
// 랜딩페이지 접속 에러 시 서버에서 처리
const credentials = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
};

const server = https.createServer(credentials, app);

server.listen(port, () => {
  console.log(`Secure Server on ${port}!`);
});

module.exports = server;
