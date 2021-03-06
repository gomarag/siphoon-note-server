const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Hello From SSL Server!đ');
});

// ëëŠíě´ě§ ě ě ěëŹ ě ěë˛ěě ě˛ëŚŹ
router.use((req, res, next) => {
  const err = new Error(`đ ${req.method} ${req.url} Router Not Found`);
  err.status = 404;
  next(err);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

router.use('/', require('./main'));
router.use('/users', require('./users'));
router.use('/essays', require('./essays'));

module.exports = router;
