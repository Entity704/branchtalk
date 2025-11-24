const API_BASE = `${window.location.origin}/api`;

export async function getIndex() {
    const res = await fetch(`${API_BASE}/index/get`);
    return await res.json();
}

export async function getRoot(rootId) {
    const res = await fetch(`${API_BASE}/root/get?id=${encodeURIComponent(rootId)}`);
    return await res.json();
}

export async function createRoot({ title, content, tags = [], parents = [] }) {
    const res = await fetch(`${API_BASE}/root/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content, tags, parents })
    });
    return await res.json();
}

export async function createNode({ rootid, content, parents = [] }) {
    const res = await fetch(`${API_BASE}/node/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ rootid, content, parents })
    });
    return await res.json();
}
