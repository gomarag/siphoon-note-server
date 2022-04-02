require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const config = require('./config/config');
const env = process.env.NODE_ENV;

const connection = mysql.createConnection(config[env]);

connection.connect(err => {
  if (err) {
    console.error('🚨 mysql connection failed: ' + err.stack);
    return;
  }
  console.log('🌞 connected as id ' + connection.threadId);
});

const app = express();

const port = process.env.HTTPS_PORT || 5500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS', 'DELETE'],
  })
);

app.use(require('./routes'));

const credentials = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
};

const secureServer = https.createServer(credentials, app);

secureServer.listen(port, () => {
  console.log(`Secure Server on ${port}!`);
});

module.exports = secureServer;
