const express = require('express');
const router = express.Router();

const {
  createEssay,
  getEssayList,
  updateEssay,
  deleteEssay,
} = require('../controllers/essays');

// 로그인 후 /essays는 token 필요
