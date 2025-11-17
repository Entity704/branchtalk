const express = require('express');
const router = express.Router();
const { loadIndex } = require('../services/dataService');

router.get('/get', (req, res) => {
    const indexContent = loadIndex();

    res.json(indexContent);
});

module.exports = router;
