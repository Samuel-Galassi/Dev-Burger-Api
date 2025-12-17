const { resolve } = require('node:path');
const express = require('express');
const corsStatic = require('../middlewares/corsStatic.js').default;

const uploadPath = resolve(__dirname, '..', '..', 'uploads');

const router = express.Router();

router.use(corsStatic); // aplica CORS
router.use(express.static(uploadPath));

module.exports = router;