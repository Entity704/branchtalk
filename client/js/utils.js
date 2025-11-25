export function linkCurve(x1, y1, x2, y2, curvature = 0.5) {
    x1 *= 16;
    y1 *= 16;
    x2 *= 16;
    y2 *= 16;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const offset = Math.abs(dy) * curvature;

    const cx1 = x1;
    const cy1 = y1 + offset;

    const cx2 = x2;
    const cy2 = y2 - offset;

    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
}
