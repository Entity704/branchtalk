const express = require('express');
const router = express.Router();
const path = require('path');
const { saveRoot, loadRoot } = require('../services/dataService');
const { generateNodeId } = require('../utils/id');

router.post('/create', (req, res) => {
    const { rootid, content, parents = [] } = req.body;

    if (!rootid || !content) {
        return res.status(400).json({ error: "missing rootid or content" });
    }

    const rootData = loadRoot(rootid);
    if (!rootData) {
        return res.status(404).json({ error: "root file not found" });
    }

    let maxLevel = 0;
    parents.forEach(p => {
        const pid = p.id;
        const proot = p.rootid || rootid;

        if (p.type === "direct" && p.rootid !== rootid && p.id !== rootid) {
            return res.status(400).json({ error: "direct parent must be in same root" });
        }

        if (!pid) return;

        let parentNode = null;

        if (proot === rootid) {
            if (rootData.root_node.id === pid) {
                parentNode = rootData.root_node;
            } else {
                parentNode = rootData.nodes.find(n => n.id === pid);
            }
        }

        if (parentNode) {
            maxLevel = Math.max(maxLevel, parentNode.level);
        }
    });

    const newLevel = maxLevel + 1;

    const newId = generateNodeId(content);

    const newNode = {
        id: newId,
        level: newLevel,
        timestamp: Date.now() / 1000,
        content,
        parents,
        newroots: []
    };

    if (!rootData.nodes) rootData.nodes = [];
    rootData.nodes.push(newNode);

    saveRoot(rootid, rootData);

    return res.json({
        status: "ok",
        id: newId
    });
});

module.exports = router;
