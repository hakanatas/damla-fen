// SAHNE 10–11 — Kavram ağı ile kaydet; Sıra sende (vızıltı grupları, saygılı tartışma); sıradaki film; bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F05;
  const NODES = [
    { id: 'root', txt: 'ÜREME', x: 960, y: 270, w: 300, col: F.LIFE, at: 0.6, size: 56 },
    { id: 'a', txt: 'Eşeyli üreme', x: 500, y: 430, w: 360, col: '#8E6A8C', at: 1.6, p: 'root' },
    { id: 'b', txt: 'Eşeysiz üreme', x: 1300, y: 430, w: 380, col: F.LIFE, at: 2.4, p: 'root' },
    { id: 'a1', txt: 'eşey hücreleri birleşir', x: 500, y: 590, w: 470, col: '#8E6A8C', at: 3.4, p: 'a', small: true },
    { id: 'a2', txt: 'çeşitlilik', x: 500, y: 730, w: 300, col: '#8E6A8C', at: 4.0, p: 'a1', small: true },
    { id: 'b1', txt: 'bölünme', x: 950, y: 620, w: 215, col: F.LIFE, at: 4.8, p: 'b', small: true, ex: ['amip,', 'bakteri'] },
    { id: 'b2', txt: 'tomurcuklanma', x: 1185, y: 620, w: 225, col: F.LIFE, at: 5.4, p: 'b', small: true, ex: ['hidra,', 'bira mayası'] },
    { id: 'b3', txt: 'rejenerasyon', x: 1425, y: 620, w: 225, col: F.LIFE, at: 6.0, p: 'b', small: true, ex: ['deniz yıldızı,', 'planarya'] },
    { id: 'b4', txt: 'vejetatif', x: 1660, y: 620, w: 205, col: F.LIFE, at: 6.6, p: 'b', small: true, ex: ['patates, çilek,', 'sardunya'] }
  ];
  function record(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 150, 1620, 760);
    P.write(ctx, 'Gözlem Defteri · Üreme', 260, 230, E.seg(t, sr + 0.1, sr + 1.0), { size: 48 });
    const byId = {}; NODES.forEach(n => byId[n.id] = n);
    NODES.forEach(n => { if (!n.p) return; const p = byId[n.p]; const k = E.se(t, sr + n.at - 0.3, sr + n.at + 0.3); if (k > 0) P.drawOn(ctx, [[p.x, p.y + 34], [n.x, n.y - 34]], k, { w: 2.4, seed: 600 + n.at * 10 }); });
    NODES.forEach((n, i) => {
      const k = E.se(t, sr + n.at, sr + n.at + 0.5, 'out'); if (k <= 0) return;
      const s = P.pop(k); const h = n.small ? 62 : 76;
      ctx.save(); ctx.translate(n.x, n.y); ctx.scale(s, s);
      const b = F.rrect(0, 0, n.w, h, 24, 6); P.fillPts(ctx, b, '#FBF8F1'); INK.wash(ctx, b, n.col, 0.25, 610 + i, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.6, closed: true, seed: 620 + i });
      const sz = F.fit(ctx, n.txt, n.size ?? (n.small ? 38 : 46), n.w - 30);
      ctx.font = `700 ${sz}px Kalam`; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(n.txt, 0, sz * 0.35);
      ctx.restore();
      if (n.ex) n.ex.forEach((l, j) => INK.label(ctx, l, n.x, n.y + 70 + j * 34, { size: 28, align: 'center', alpha: 0.75 * E.se(t, sr + n.at + 0.4, sr + n.at + 1.0) }));
    });
    DAMLA.draw(ctx, { x: 1800, y: 1045, s: 1.0, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.2], blink: E.blink(t, 8), squash: E.breath(t), t, seed: 6, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
  }
  function buzzIcon(ctx, x, y, t) {
    [[-70, 30], [0, -20], [70, 30]].forEach(([dx, dy], i) => {
      const hx = x + dx, hy = y + dy; const hd = circlePts(hx, hy, 34, 36, 24); F.shape(ctx, hd, { fill: '#F4ECDD', col: i === 1 ? F.LIFE : PAL.water, a: 0.3, seed: 700 + i });
      const bd = P.arc(hx, hy + 90, 52, Math.PI, Math.PI * 2, 20, 46); F.shape(ctx, bd, { fill: '#F4ECDD', col: i === 1 ? F.LIFE : PAL.water, a: 0.3, seed: 710 + i });
      inkDot(ctx, hx - 10, hy - 4, 2.5); inkDot(ctx, hx + 10, hy - 4, 2.5);
    });
    for (let i = 0; i < 3; i++) { const a = -2.2 + i * 0.5; const r0 = 110 + 8 * Math.sin(t * 6 + i); line(ctx, [x + Math.cos(a) * r0, y - 40 + Math.sin(a) * r0], [x + Math.cos(a) * (r0 + 26), y - 40 + Math.sin(a) * (r0 + 26)], { w: 3, dry: false, seed: 720 + i }); }
    INK.label(ctx, 'vız vız', x, y - 190, { size: 30, align: 'center', alpha: 0.6 });
  }
  const inkDot = INK.inkDot;
  function outro(ctx, t) {
    const st = E.s('task'), sp = E.s('respect'), sn = E.s('next'), se = E.s('end');
    const hill = P.hillLine(E.W);
    P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1760, P.hillY(hill, 1760) + 6] });
    // sıradaki: çiçek ve arı
    const fx = 1300, fy = P.hillY(hill, fx) + 6, grow = E.se(t, sn - 0.2, sn + 3);
    if (grow > 0) {
      const top = fy - 300 * grow; line(ctx, [fx, fy], [fx + 6, top], { w: 5, color: F.LIFE_D, seed: 800 });
      F.leaf(ctx, fx + 3, fy - 110 * grow, 90 * grow, -0.5, 801); F.leaf(ctx, fx + 4, fy - 170 * grow, 80 * grow, Math.PI + 0.5, 802);
      if (grow > 0.6) { const kf = (grow - 0.6) / 0.4; for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + 0.3; const pp = F.blob(fx + 6 + Math.cos(a) * 40 * kf, top + Math.sin(a) * 40 * kf, 34 * kf, 22 * kf, 810 + i, 0.08, 30, a); F.shape(ctx, pp, { fill: '#F3DDE3', col: '#B0607A', a: 0.45, seed: 820 + i, w: 2 }); } P.fillPts(ctx, circlePts(fx + 6, top, 20 * kf, 20 * kf, 16), '#E3C04A'); }
    }
    const dx = 620, dy = P.hillY(hill, dx) + 4;
    DAMLA.draw(ctx, { x: dx, y: dy, s: 1.35, view: 'q3', expr: 'happy', look: [0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 230, t, sn + 0.6, se + 0.2, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, 'Bitkilerde Üreme, Büyüme ve Gelişme', 960, 320, t, sn + 1.2, se + 0.2, { size: 70, align: 'center' });
    // Sıra sende kartı
    F.taskCard(ctx, t, st, sn, 'Sıra sende!', [
      { txt: 'Arkadaşlarınla vızıltı grubu kurun.', at: st + 1.4 },
      { txt: 'Çevrenizde eşeysiz üreyen canlıları', at: st + 2.8 },
      { txt: 'araştırın ve listeleyin.', at: st + 4.0 },
      { txt: 'Herkesin fikrini nezaketle dinleyin.', at: sp + 0.3, color: F.LIFE_D },
      { txt: 'Her fikir değerlidir!', at: sp + 1.8, color: F.LIFE_D }
    ], (c, x, y) => buzzIcon(c, x - 10, y + 40, t));
    F.endCard(ctx, t, '5', 'Canlılar Nasıl Çoğalır?', 'FB.6.3.1');
  }
  E.scene({ name: 'Kaydet', concept: 'Kavram ağı ile kaydetme', from: 'record', to: 'record', trFrom: [960, 540], draw(ctx, t) { record(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Grup görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540], draw(ctx, t) { outro(ctx, t); } });
})();
