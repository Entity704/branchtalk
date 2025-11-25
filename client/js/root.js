import * as api from './api.js';
import * as ui from './ui.js';
import * as utils from './utils.js';

const params = new URLSearchParams(location.search);

const isCreate = params.get('create') === '1';
let rootId, rootData;
let createNodeParents = [];
if(!isCreate) {
    rootId = params.get('id');
    rootData = await api.getRoot(rootId);
    createNodeParents.push({
        rootid: rootId,
        id: rootId,
        type: 'direct'
    });
}

const html = document.documentElement;
const nodeTree = document.getElementById('nodes');
const tagBar = document.getElementById('tags');
const spacer = document.createElement('div');
const links = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

links.style.display = 'block';
links.style.position = 'absolute';
links.style.top = '0';
links.style.left = '0';

spacer.style.width = '1px';
spacer.style.height = '1px';
spacer.style.pointerEvents = 'none';

const isRootRadio = document.getElementById('isRoot');
const titleInput = document.getElementById('editor-title');
const tagsInput = document.getElementById('editor-tags');
const input = document.getElementById('editor-textarea');
const submit = document.getElementById('submit');

const createPage = {
    root_node: {
        title: 'Create New Node',
        tags: [],
        parents: [],
        content: 'You can create a new branch tree (root node) on this page'
    }
}

/* --- show nodes --- */

let levels = [];
let nodePos = {};
function renderTree(rootData) {
    nodeTree.innerHTML = '';

    nodeTree.appendChild(spacer);
    nodeTree.appendChild(links);

    document.getElementById('title').textContent = rootData.root_node.title;
    document.getElementById('last-updated').textContent = rootData.root_node.timestamp ? (new Date(rootData.root_node.timestamp * 1000).toLocaleString()) : '';
    document.getElementById('content').textContent = rootData.root_node.content;

    rootData.root_node.tags?.forEach(t => {
        const tag = document.createElement('span');
        tag.textContent = t;
        tag.className = 'tag';
        tagBar.appendChild(tag);
    });

    // Precompute position
    rootData.nodes?.forEach(n => {
        levels[n.level] = (levels[n.level] || 0) + 1;

        nodePos[n.id] = {
            x: (levels[n.level] - 1) * 22 + 2,
            y: n.level * 12 - 2
        };
    });

    rootData.nodes?.forEach(n => {
        const node = document.createElement('div');
        node.textContent = n.content;
        node.className = 'node-card';

        const posX = nodePos[n.id].x;
        const posY = nodePos[n.id].y;

        node.style.top = `${posY}rem`;
        node.style.left = `${posX}rem`;

        spacer.style.width = Math.max(
            parseFloat(spacer.style.width),
            posX + 22) + 'rem';
        spacer.style.height = Math.max(
            parseFloat(spacer.style.height),
            posY + 20) + 'rem';

        rootData.nodes.forEach(bn => {
            let parentNode = n.parents.find(item => item.id === bn.id && item.type === 'direct') ||
                n.parents.find(item => item.id === rootData.root_node.id && item.type === 'direct');

            if (!parentNode) return;

            const link = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            link.setAttribute('d', utils.linkCurve(
                (nodePos[parentNode?.id]?.x ?? posX) + 8,
                (nodePos[parentNode.id]?.y ?? -2.8) + 2.8,
                posX + 8, posY + 0.2)
            );
            link.setAttribute('fill', 'none');
            links.appendChild(link);
        });

        nodeTree.appendChild(node);

        // TODO: complete this
    });

    links.setAttribute('width', parseFloat(spacer.style.width) * 16);
    links.setAttribute('height', parseFloat(spacer.style.height) * 16);
    links.style.width = `${parseFloat(spacer.style.width) * 16}px`;
    links.style.height = `${parseFloat(spacer.style.height) * 16}px`;
}

/* --- handles --- */

async function handleSubmit() {
    let res;

    const title = titleInput.value;
    const content = input.value;

    if (isRootRadio.checked) {
        // TODO: implement this feature
    } else {
        res = await api.createNode(
            {
                rootid: rootId,
                content,
                parents: createNodeParents
            }
        );
    }

    if (res.ok) {
        input.value = '';
        ui.notice('Submit succeed!', '#108610');
        if (!isCreate) { location.reload() };
    } else {
        ui.notice('Submit failed!');
    }
}

function switchNodeType() {
    if (isRootRadio.checked) {
        titleInput.style.visibility = 'visible';
        tagsInput.style.visibility = 'visible';
    } else {
        titleInput.style.visibility = 'hidden';
        tagsInput.style.visibility = 'hidden';
    }
}
switchNodeType()

function setCreateTree() {
    document.getElementById('isRootLabel').style.display = 'none';
    isRootRadio.checked = true;
    switchNodeType();
    renderTree(createPage);
}

// Draging handle
let dragging = false;
let startX = 0;
let startY = 0;
let scrollLeft = 0;
let scrollTop = 0;

nodeTree.addEventListener('mousedown', e => {
    if (e.target !== nodeTree && e.target !== links) return;

    dragging = true;
    startX = e.clientX;
    startY = e.clientY;

    scrollLeft = nodeTree.scrollLeft;
    scrollTop = html.scrollTop;

    e.preventDefault();
});

window.addEventListener('mousemove', e => {
    if (!dragging) return;

    nodeTree.scrollTo({
        left: scrollLeft - (e.clientX - startX)
    });
    html.scrollTo({
        top: scrollTop - (e.clientY - startY)
    });
});

window.addEventListener('mouseup', () => dragging = false);

nodeTree.addEventListener('mouseover', (e) => {
    if (e.target === nodeTree || e.target === links) {
        nodeTree.style.cursor = 'all-scroll';
    }
});

nodeTree.addEventListener('mouseout', (e) => {
    if (e.target === nodeTree || e.target === links) {
        nodeTree.style.cursor = 'auto';
    }
});

/* --- button binds --- */

submit.onclick = handleSubmit;
isRootRadio.onclick = switchNodeType;


if (isCreate) {
    setCreateTree();
} else {
    renderTree(rootData);
}
