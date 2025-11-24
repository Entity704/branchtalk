import * as api from './api.js';
import * as ui from './ui.js';

const params = new URLSearchParams(location.search);

const isCreate = params.get('create') === '1';
let rootId, rootData;
if(!isCreate) {
    rootId = params.get('id');
    rootData = await api.getRoot(rootId);
}

const html = document.documentElement;
const nodeTree = document.getElementById('nodes');
const tagBar = document.getElementById('tags');
const spacer = document.createElement('div');
spacer.style.pointerEvents = 'none';

const isRootRadio = document.getElementById('isRoot');
const titleInput = document.getElementById('editor-title');
const tagsInput = document.getElementById('editor-tags');
const input = document.getElementById('editor-textarea');
const submit = document.getElementById('submit');

let createNodeParents = [];

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
function renderTree(rootData) {
    nodeTree.innerHTML = '';

    spacer.style.width = '1px';
    spacer.style.height = '1px';
    nodeTree.appendChild(spacer);

    document.getElementById('title').textContent = rootData.root_node.title;
    document.getElementById('last-updated').textContent = rootData.root_node.timestamp ? (new Date(rootData.root_node.timestamp * 1000).toLocaleString()) : '';
    document.getElementById('content').textContent = rootData.root_node.content;

    rootData.root_node.tags?.forEach(t => {
        const tag = document.createElement('span');
        tag.textContent = t;
        tag.className = 'tag';
        tagBar.appendChild(tag);
    });

    rootData.nodes?.forEach(n => {
        const node = document.createElement('div');
        node.textContent = n.content;
        node.className = 'node-card';

        levels[n.level] = (levels[n.level] || 0) + 1;

        node.style.top = `${n.level * 8 - 6}rem`;
        node.style.left = `${(levels[n.level] - 1) * 14 + 2}rem`;

        spacer.style.width = Math.max(
            parseFloat(spacer.style.width),
            parseFloat(node.style.left) + 15) + 'rem';
        spacer.style.height = Math.max(
            parseFloat(spacer.style.height),
            parseFloat(node.style.top) + 12) + 'rem';
        nodeTree.appendChild(node);

        // TODO: complete this
    });
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
                content: input.value,
                parents: createNodeParents
            }
        );
    }

    if (res.ok) {
        input.value = '';
        ui.notice('Submit succeed!', '#108610');
        if (!isCreate) { renderTree(rootData) };
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

let dragging = false;
let startX = 0;
let startY = 0;
let scrollLeft = 0;
let scrollTop = 0;

nodeTree.addEventListener('mousedown', e => {
    if (e.target !== nodeTree) return;

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
    if (e.target === nodeTree) {
        nodeTree.style.cursor = 'all-scroll';
    }
});

nodeTree.addEventListener('mouseout', (e) => {
    if (e.target === nodeTree) {
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
