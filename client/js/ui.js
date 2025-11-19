export function notice(content, color='#000') {
    const body = document.body;

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.backdropFilter = 'blur(10px)';
    overlay.style.zIndex = '20';

    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.25s ease';

    const noticeWindow = document.createElement('div');
    noticeWindow.style.display = 'flex';
    noticeWindow.style.position = 'fixed';
    noticeWindow.style.fontSize = 'large';
    noticeWindow.style.fontWeight = 'bold';
    noticeWindow.style.color = color;
    noticeWindow.style.width = '240px';
    noticeWindow.style.height = '160px';
    noticeWindow.style.top = 'calc(50vh - 80px)';
    noticeWindow.style.left = 'calc(50vw - 120px)';
    noticeWindow.style.zIndex = '21';
    noticeWindow.style.border = '2px solid #ccc';
    noticeWindow.style.borderRadius = '16px';
    noticeWindow.style.backgroundColor = '#fff';
    noticeWindow.style.boxSizing = 'border-box';
    noticeWindow.style.paddingBottom = '30px';
    noticeWindow.style.justifyContent = 'center';
    noticeWindow.style.alignItems = 'center';
    noticeWindow.innerHTML = content;

    noticeWindow.style.opacity = '0';
    noticeWindow.style.transform = 'scale(0.9)';
    noticeWindow.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

    const closeButton = document.createElement('button');
    closeButton.style.position = 'absolute';
    closeButton.style.width = '160px';
    closeButton.style.height = '24px';
    closeButton.style.bottom = '16px';
    closeButton.style.left = '40px';
    closeButton.style.border = '2px solid #ccc';
    closeButton.style.borderRadius = '8px';
    closeButton.style.backgroundColor = '#f8f8f8';
    closeButton.style.cursor = 'pointer';
    closeButton.onmouseover = () => { closeButton.style.backgroundColor = '#f0f0f0' };
    closeButton.onmouseleave = () => { closeButton.style.backgroundColor = '#f8f8f8' };
    closeButton.textContent = 'Close';
    closeButton.onclick = () => {
        overlay.remove();
        noticeWindow.remove();
        closeButton.remove();
    };

    body.appendChild(overlay);
    body.appendChild(noticeWindow);
    noticeWindow.appendChild(closeButton);

    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        noticeWindow.style.opacity = '1';
        noticeWindow.style.transform = 'scale(1)';
    });
}
