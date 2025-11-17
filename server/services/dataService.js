const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '../data/roots');
const INDEX_FILE = path.join(__dirname, '../data/index.json');

function loadIndex() {
    if (!fs.existsSync(INDEX_FILE)) {
        return { roots: [] };
    }
    return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
}

function saveIndex(data) {
    fs.writeFileSync(INDEX_FILE, JSON.stringify(data, null, 2));
}

function loadRoot(id) {
    const file = path.join(ROOT_DIR, `${id.slice(0, 2)}/${id}.json`);
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function saveRoot(id, data) {
    const dir = path.join(ROOT_DIR, id.slice(0, 2));
    const file = path.join(dir, `${id}.json`);

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {
    loadIndex,
    saveIndex,
    loadRoot,
    saveRoot
};
