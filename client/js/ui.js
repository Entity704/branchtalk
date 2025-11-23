export function notice(content, color = '#000') {
    if (!document.getElementById('notice-style')) {
        const style = document.createElement('style');
        style.id = 'notice-style';
        style.textContent = `
        .notice-overlay {
            position: fixed;
            inset: 0;
            backdrop-filter: blur(10px);
            background: rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity .25s ease;
            z-index: 9999;
        }
        .notice-overlay.show {
            opacity: 1;
        }

        .notice-window {
            width: 240px;
            height: 160px;
            min-height: 160px;
            padding: 20px 20px 40px 20px;
            background: #fff;
            border-radius: 16px;
            border: 2px solid #ccc;
            box-sizing: border-box;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: large;
            font-weight: bold;
            text-align: center;

            transform: scale(0.9);
            opacity: 0;
            transition: opacity .25s ease, transform .25s ease;
            position: relative;
        }

        .notice-window.show {
            opacity: 1;
            transform: scale(1);
        }

        .notice-close {
            position: absolute;
            bottom: 16px;
            left: 50%;
            transform: translateX(-50%);
            width: 160px;
            height: 28px;
            border: 2px solid #ccc;
            border-radius: 8px;
            background: #f8f8f8;
            cursor: pointer;
        }
        .notice-close:hover {
            background: #f0f0f0;
        }
        `;
        document.head.appendChild(style);
    }

    const overlay = document.createElement('div');
    overlay.className = 'notice-overlay';

    const windowBox = document.createElement('div');
    windowBox.className = 'notice-window';
    windowBox.style.color = color;
    windowBox.innerHTML = content;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'notice-close';
    closeBtn.textContent = 'Close';

    windowBox.appendChild(closeBtn);
    overlay.appendChild(windowBox);
    document.body.appendChild(overlay);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    overlay.getBoundingClientRect();

    requestAnimationFrame(() => {
        overlay.classList.add('show');
        windowBox.classList.add('show');
    });

    const close = () => {
        overlay.classList.remove('show');
        windowBox.classList.remove('show');
        document.body.style.overflow = prevOverflow;

        setTimeout(() => overlay.remove(), 250);
    };

    closeBtn.onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };
}
