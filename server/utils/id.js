const crypto = require('crypto');

function generateNodeId(input) {
    const random = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256')
        .update(Date.now() + random + input)
        .digest('hex');
    return hash;
}

module.exports = { generateNodeId };
