// SAHNE 1 — Merak: pazarda "kilo", kütle = ağırlık mı?, Ay'da astronot yürüyüşü (TYMM köprü kurma)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const BR = '#8A4A10', FY = 860;
  function stall(ctx) {
    const x0 = 1180, x1 = 1760;
    line(ctx, [x0 + 20, FY], [x0 + 20, 330], { w: 6, taper: 0 }); line(ctx, [x1 - 20, FY], [x1 - 20, 330], { w: 6, taper: 0 });
    for (let i = 0; i < 6; i++) { const a = x0 + i * (x1 - x0) / 6, b = a + (x1 - x0) / 6; const s = [[a, 280], [b, 280], [b, 360], [a, 360]]; P.fillPts(ctx, s, i % 2 ? PAL.white : '#B5553F', i % 2 ? 0.9 : 0.7); }
    stroke(ctx, [[x0 - 10, 280], [x1 + 10, 280], [x1, 360], [x0, 360], [x0 - 10, 280]], { w: 3, closed: true });
    const cr = F07.rect(x0 + 60, 660, x1 - 60, FY); P.fillPts(ctx, cr, '#C9A87A'); INK.wash(ctx, cr, '#8A6A45', 0.35, 4101, { bleed: 1 }); stroke(ctx, cr, { w: 3, closed: true });
    for (let i = 0; i < 9; i++) { const ax = x0 + 110 + i * 45, ay = 640 - (i % 2) * 18; P.fillPts(ctx, circlePts(ax, ay, 24, 22, 20), '#C8573A', 0.8); stroke(ctx, circlePts(ax, ay, 24, 22, 20), { w: 1.8, closed: true, dry: false }); }
    const sign = [[1330, 420], [1610, 414], [1614, 520], [1334, 526], [1330, 420]]; P.fillPts(ctx, sign, '#FAF6EC'); stroke(ctx, sign, { w: 2.6, closed: true });
    F07.txt(ctx, 'elma · 1 kg', 1472, 485, { size: 44, align: 'center' });
  }
  E.scene({
    name: 'Merak', concept: 'Kütle ve ağırlık aynı mı?', from: 'title', to: 'moon',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('question'), sm = E.s('moon');
      const aM = E.se(t, sm - 0.3, sm + 0.8);
      if (aM < 1) E.layer(ctx, 1 - aM, c => {
        c.save(); c.globalAlpha = 0.12; c.fillStyle = PAL.water; c.fillRect(0, 0, E.W, FY); c.restore();
        F07.floor(c, FY, 1);
        const sk = E.se(t, sh - 0.5, sh + 0.8); if (sk > 0) { c.save(); c.globalAlpha = sk; stall(c); c.restore(); }
        // question bubble
        const qk = E.se(t, sq + 0.2, sq + 0.8, 'out');
        P.bubble(c, 560, 300, 620, 230, [730, 650], qk, 7);
        if (qk > 0.7) {
          F07.txt(c, 'kütle', 390, 300, { size: 58 }); F07.txt(c, '=', 555, 300, { size: 58, align: 'center' }); F07.txt(c, 'ağırlık', 610, 300, { size: 58 });
          F07.txt(c, '?', 840, 320, { size: 90, color: BR });
          F07.txt(c, 'kg mı?   N mi?', 560, 380, { size: 40, align: 'center', alpha: E.se(t, sq + 1.4, sq + 2.2) });
        }
        DAMLA.draw(c, { x: 700, y: FY, s: 1.4, view: t < sq ? 'q3' : 'front', expr: t < 1.2 ? 'neutral' : (t < sq ? 'curious' : 'thinking'), look: t < sq ? [0.8, -0.2] : [-0.4, -0.7], blink: t < 1.2 ? 1 : E.blink(t, 2), squash: E.breath(t), t, seed: 1,
          arms: t < sq ? [[-1, 0.4], [1, t > sh + 1 ? 2.0 : 0.4]] : [[-1, 0.3], [1, [30, -86]]] });
      });
      if (aM > 0) E.layer(ctx, aM, c => {
        c.save(); c.fillStyle = '#2A2830'; c.globalAlpha = 0.85; c.fillRect(0, 0, E.W, E.H); c.restore();
        const R = INK.rng(41); c.save(); c.fillStyle = PAL.white; for (let i = 0; i < 90; i++) { c.globalAlpha = 0.3 + R() * 0.6; c.beginPath(); c.arc(R() * E.W, R() * 600, 1 + R() * 1.8, 0, 7); c.fill(); } c.restore();
        P.earth(c, 1580, 230, 80, { rot: t * 0.05 });
        F07.moonGround(c, 800);
        // hopping astronaut along arcs
        const u = E.seg(t, sm + 0.8, E.e('moon')), px = 300 + 1000 * u, hop = 5, ph = (u * hop) % 1;
        const hy = -Math.sin(ph * Math.PI) * 170;
        c.save(); c.globalAlpha = 0.5; const tr = []; for (let i = 0; i <= 120; i++) { const uu = i / 120 * u; const pp = (uu * hop) % 1; tr.push([300 + 1000 * uu, 800 - Math.sin(pp * Math.PI) * 170]); } if (tr.length > 2) dashed(c, tr, { w: 2.4, on: 10, off: 10, color: PAL.white }); c.restore();
        for (let i = 0; i < Math.floor(u * hop); i++) { const fx = 300 + 1000 * (i + 1) / hop; c.save(); c.fillStyle = '#6E685E'; c.globalAlpha = 0.6; c.beginPath(); c.ellipse(fx, 806, 14, 4, 0, 0, 7); c.fill(); c.restore(); }
        F07.astronaut(c, px, 800 + hy, 1.1, ph * 6.28);
        INK.label(c, 'Ay yüzeyi', 180, 900, { size: 38, weight: 700 });
        INK.label(c, 'Dünya', 1580, 360, { size: 36, weight: 700, align: 'center', color: PAL.white });
        E.inkText(c, 'neden zıplıyorlar?', 960, 160, t, sm + 2.5, 1e9, { size: 62, align: 'center', color: PAL.white });
      });
      F07.title(ctx, t, 7, 'Kütle ve Ağırlık', 2);
    }
  });
})();
