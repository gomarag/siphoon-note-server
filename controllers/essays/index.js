const { createEssay } = require('./createEssay');
const { getEssayList } = require('./getEssayList');
const { updateEssay } = require('./updateEssay');
const { deleteEssay } = require('./deleteEssay');

module.exports = {
  // 새 글 쓰기
  createEssay,

  // 글 목록 조회
  getEssayList,

  // 글 수정: 공개여부, 내용 수정, 휴지통으로 보낼지 여부
  updateEssay,

  // 글 삭제: 휴지통의 글 삭제
  deleteEssay,
};
