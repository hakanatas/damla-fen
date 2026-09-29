// SAHNE 1 — Yapraktaki su damlaları damarları, yazıdaki damla harfleri büyütür (köprü kurma, FB.7.4.2) → mercek tanımı
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F713;
  const LEAF_C = [640, 560];
  const leafPts = (() => { const p = []; for (let i = 0; i <= 80; i++) { const a = i / 80 * Math.PI * 2; const r = 1 - 0.25 * Math.abs(Math.sin(a)); p.push([LEAF_C[0] + Math.cos(a) * 470 * (0.75 + 0.25 * Math.cos(a)) , LEAF_C[1] + Math.sin(a) * 230 * r]); } return p; })();
  const VEINS = (() => { const v = [[[190, 560], [1100, 560]]]; for (let i = 0; i < 7; i++) { const x = 300 + i * 115; v.push([[x, 560], [x + 90, 560 - 150 + (i % 2) * 6]]); v.push([[x, 560], [x + 90, 560 + 150 - (i % 2) * 6]]); } return v; })();
  const DROPS = [[520, 470, 58], [800, 640, 50], [960, 520, 40]];

  function veins(ctx, o = {}) { VEINS.forEach((v, i) => line(ctx, v[0], v[1], { w: (i === 0 ? 5 : 2.6) * (o.k ?? 1), color: '#4F6A28', alpha: 0.8, dry: false, seed: 900 + i, taper: 0.1 })); }
  function drop(ctx, x, y, r, mag, drawBelow, bg) {
    ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.8, 0, 0, 7); ctx.clip();
    if (bg) { ctx.fillStyle = bg; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); }
    ctx.translate(x, y); ctx.scale(mag, mag); ctx.translate(-x, -y); drawBelow(ctx); ctx.restore();
    const e = circlePts(x, y, r, r * 0.8, 40);
    P.fillPts(ctx, e, '#D6E8F2', 0.28); stroke(ctx, e, { w: 2.4, closed: true, color: PAL.water, seed: 910 + x | 0, dry: false });
    ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.ellipse(x - r * 0.35, y - r * 0.35, r * 0.18, r * 0.1, -0.6, 0, 7); ctx.fill(); ctx.restore();
  }

  E.scene({
    name: 'Yapraktaki damlalar', concept: 'Damla mercek gibi davranır (köprü kurma)', from: 'title', to: 'define',
    draw(ctx, t) {
      const sh = E.s('hello'), sx = E.s('text'), sd = E.s('define');
      const leafA = 1 - E.se(t, sx - 0.2, sx + 0.6);
      if (leafA > 0) E.layer(ctx, leafA, c => {
        const leafDraw = cc => { P.fillPts(cc, leafPts, '#B9CC8E', 1); veins(cc); };
        P.fillPts(c, leafPts, '#B9CC8E', 1); wash(c, leafPts, PAL.life, 0.5, 901, { bleed: 3, blooms: 3 }); veins(c);
        stroke(c, leafPts, { w: 3.4, closed: true, seed: 902, color: '#3F5520' });
        line(c, [1100, 560], [1240, 610], { w: 7, color: '#4F6A28', seed: 903 });
        DROPS.forEach(([x, y, r], i) => { const k = E.se(t, sh + 0.5 + i * 0.5, sh + 1.1 + i * 0.5, 'out'); if (k > 0) drop(c, x, y - (1 - k) * 60, r, 1.7, leafDraw); });
        if (t > sh + 3.5) { const k = E.se(t, sh + 3.5, sh + 4.2); c.save(); c.globalAlpha *= k; stroke(c, circlePts(520, 470, 88, 76, 40), { w: 3, closed: true, color: '#8A4A10', seed: 905 }); c.restore();
          E.inkText(c, 'damar daha kalın görünüyor!', 440, 320, t, sh + 3.8, 1e9, { size: 40, color: '#8A4A10' }); }
      });
      // yazıya damlayan su
      const tA = E.se(t, sx - 0.2, sx + 0.6);
      if (tA > 0) E.layer(ctx, tA, c => {
        F.card(c, 200, 330, 1000, 420, { seed: 911 });
        const txt = cc => { cc.save(); cc.font = '700 56px Kalam'; cc.fillStyle = PAL.ink; cc.fillText('Işık saydam maddeden geçer.', 260, 470); cc.fillText('Damla bir mercek olabilir mi?', 260, 600); cc.restore(); };
        txt(c);
        const k = E.se(t, sx + 1.0, sx + 1.7, 'out');
        if (k > 0) drop(c, 620, 455 - (1 - k) * 80, 70, 1.6, txt, '#FAF6EC');
        if (t > sx + 3) E.inkText(c, 'harfler büyüdü!', 820, 700, t, sx + 3, 1e9, { size: 42, color: '#8A4A10' });
      });
      // tanım
      const dk = E.se(t, sd + 0.2, sd + 0.8);
      if (dk > 0) E.layer(ctx, dk, c => {
        const b = [[200, 790], [1300, 784], [1306, 900], [204, 906], [200, 790]];
        P.fillPts(c, b, '#F6E7B8', 0.95); stroke(c, b, { w: 3, closed: true, color: F.AMB, seed: 921 });
        P.write(c, 'mercek: ışığı kırarak yolunu değiştiren,', 752, 836, E.seg(t, sd + 0.5, sd + 2.0), { size: 38, align: 'center' });
        P.write(c, 'en az bir yüzeyi eğri, saydam cisim', 752, 882, E.seg(t, sd + 1.8, sd + 3.2), { size: 38, align: 'center' });
      });
      DAMLA.draw(ctx, { x: 1560, y: 880, s: 1.3, view: 'q3', flip: true, expr: t > sx + 3 ? 'thinking' : (t > sh + 3.5 ? 'surprised' : 'curious'), look: [-0.8, 0.1], blink: E.blink(t, 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        prop: t > sh ? 'lens' : null, propTilt: -0.3, arms: t > sh ? [[-1, 0.35], [1, 1.9]] : [[-1, 0.35], [1, 0.35]] });
      // başlık kartı
      const t1 = E.e('title') + 1.4;
      if (t < t1) E.layer(ctx, 1 - E.se(t, t1 - 0.8, t1), c => { c.fillStyle = 'rgba(241,234,219,0.93)'; c.fillRect(300, 130, 1320, 250); });
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '13 · Mercekler', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 7. sınıf · Ünite 4', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.8 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();
