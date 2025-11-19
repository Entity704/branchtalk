import * as api from './api.js';
import * as ui from './ui.js';

const params = new URLSearchParams(location.search);

const isCreate = params.get('create') === '1';
const rootId = params.get('id');
const rootData = await api.getRoot(rootId)

const isRootRadio = document.getElementById('isRoot');
const titleInput = document.getElementById('editor-title');
const tagsInput = document.getElementById('editor-tags');
const input = document.getElementById('editor-textarea');
const submit = document.getElementById('submit');

/* --- show nodes --- */

function renderTree(rootData) {
    // TODO: complete this
}

function renderCreateTree() {
    // TODO: complete this
}

/* --- handles --- */

function handleSubmit() {
    let res;

    const title = titleInput.value;
    const content = input.value;

    if (isRootRadio.checked) {
        // TODO: implement this feature
    } else {
        // TODO: implement this feature
    }

    if (res.ok) {
        input.value = '';
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
