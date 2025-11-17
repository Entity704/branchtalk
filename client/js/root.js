import * as api from './api.js';

const params = new URLSearchParams(location.search);
const rootid = params.get('id');
const rootData = api.getRoot(rootid)
