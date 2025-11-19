import * as api from './api.js';
import * as ui from './ui.js';

const params = new URLSearchParams(location.search);

const isCreate = params.get('create') === '1';
let rootId, rootData;
if(!isCreate) {
    rootId = params.get('id');
    rootData = await api.getRoot(rootId);
}

const nodeTree = document.getElementById('node-tree');

const isRootRadio = document.getElementById('isRoot');
const titleInput = document.getElementById('editor-title');
const tagsInput = document.getElementById('editor-tags');
const input = document.getElementById('editor-textarea');
const submit = document.getElementById('submit');

let createNodeParents = [];

const createPage = {
    root_node: {
        title: 'Create New Node',
        timestamp: Date.now() / 1000,
        tags: [],
        parents: [],
        content: 'You can create a new branch tree (root node) on this page'
    },
    nodes: []
}

/* --- show nodes --- */

function renderTree(rootData) {
    document.getElementById('nodes').innerHTML = '';

    document.getElementById('title').textContent = rootData.root_node.title;
    document.getElementById('last-updated').textContent = (new Date(rootData.root_node.timestamp * 1000).toLocaleString());
    document.getElementById('content').textContent = rootData.root_node.content;

    // TODO: complete this
}

function renderCreateTree() {
    renderTree(createPage);
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

/* --- button binds --- */

submit.onclick = handleSubmit;
isRootRadio.onclick = switchNodeType;


if (isCreate) {
    renderCreateTree();
} else {
    renderTree(rootData);
}
