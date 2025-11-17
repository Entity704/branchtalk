const express = require('express');
const router = express.Router();
const { loadIndex, saveIndex, saveRoot, loadRoot } = require('../services/dataService');
const { generateNodeId } = require('../utils/id');

router.post('/create', (req, res) => {
    const { title, content, tags = [], parents = [] } = req.body;

    if (!(title || content)) {
        return res.json({ ok: false, msg: 'missing content' });
    }

    const id = generateNodeId(title + content);

    const rootNode = {
        id,
        level: 0,
        timestamp: Date.now() / 1000,
        title,
        content,
        tags,
        parents,
        newroots: []
    };

    const rootFileData = {
        root_node: rootNode,
        nodes: []
    };

    saveRoot(id, rootFileData);

    parents.forEach(p => {
        if (p.type === 'direct') {
            const rootData = loadRoot(p.rootid);
            if (!rootData) return;
            let parentNode;

            if (rootData.root_node.id === p.id) {
                parentNode = rootData.root_node;
            } else {
                parentNode = rootData.nodes.find(n => n.id === p.id);
            }

            if (parentNode) {
                if (!parentNode.newroots) parentNode.newroots = [];
                parentNode.newroots.push(id);
            }

            saveRoot(p.rootid, rootData);
        }
    });

    const index = loadIndex();
    index.roots.push({
        id,
        title,
        tags,
        timestamp: rootNode.timestamp,
        parents
    });

    saveIndex(index);

    res.json({ ok: true, id });
});

router.get('/get', (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: 'missing id parameter' });
    }

    const rootContent = loadRoot(id);

    if (!rootContent) {
        return res.status(404).json({ error: 'root not found' });
    }

    res.json(rootContent);
});

module.exports = router;
