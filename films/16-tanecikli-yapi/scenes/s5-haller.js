// SAHNE 5 — Katı, sıvı, gaz: tanecik düzeni, boşluk ve hareket (FB.5.5.1 c: katı-sıvı-gaz olarak gruplandırır)
// Katı: yalnızca titreşim · Sıvı ve gaz: titreşim, dönme, öteleme · Öteleme → akışkanlık
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F16;
  const COLS = [
    { id: 'solid', x: 360, name: 'KATI', st: 'ice', kind: 'solid', mot: 'yalnızca titreşim', gap: 'çok yakın, düzenli' },
    { id: 'liquid', x: 960, name: 'SIVI', st: 'liquid', kind: 'liquid', mot: 'titreşim · dönme · öteleme', gap: 'yakın, düzensiz' },
    { id: 'gas', x: 1560, name: 'GAZ', st: 'vapor', kind: 'gas', mot: 'titreşim · dönme · öteleme', gap: 'çok uzak, serbest' }
  ];
  function intro(ctx, t) {
    const ss = E.s('states');
    const ph = E.seg(t, ss + 0.5, ss + 9.5);
    const idx = Math.min(2, Math.floor(ph * 3));
    const st = ['ice', 'liquid', 'vapor'][idx];
    const sw = (ph * 3) % 1; const pulse = sw < 0.12 ? Math.sin(sw / 0.12 * Math.PI) : 0;
    DAMLA.draw(ctx, { x: 900, y: 850, s: 2.0, view: 'front', expr: idx === 0 ? 'surprised' : 'happy', look: [0, -0.1], blink: E.blink(t, 6), squash: E.breath(t) * (1 + pulse * 0.1), t: t * [0.4, 1, 2][idx], seed: 1, state: st, arms: [[-1, 0.5 + pulse], [1, 0.5 + pulse]] });
    ['buz · katı', 'su · sıvı', 'buhar · gaz'].forEach((nm, i) => {
      const k = E.se(t, ss + 0.5 + i * 3, ss + 1.1 + i * 3, 'out');
      const on = i === idx;
      if (k > 0) { ctx.save(); ctx.globalAlpha = k * (on ? 1 : 0.4); INK.label(ctx, nm, 1400, 440 + i * 100, { size: on ? 60 : 48, weight: 700, align: 'left', color: on ? PAL.water : PAL.ink }); if (on) P.arrow(ctx, [1380, 425 + i * 100], [1180, 470 + i * 60], 1, { w: 3, head: 14 }); ctx.restore(); }
    });
  }
  function columns(ctx, t) {
    const sl = E.s('liquid'), sgs = E.s('gas'), sf = E.s('flow');
    const active = t < sl ? 0 : t < sgs ? 1 : t < sf ? 2 : -1;
    COLS.forEach((c, i) => {
      const s0 = E.s(c.id), k = E.se(t, s0 + 0.1, s0 + 0.9, 'out');
      if (k < 1) { ctx.save(); ctx.globalAlpha = 0.28 * (1 - k); INK.label(ctx, c.name, c.x - 40, 250, { size: 62, weight: 700, align: 'center' }); F.box(ctx, c.x - 210, 340, 420, 380, { lid: c.kind === 'gas', seed: 170 + i }); INK.label(ctx, '?', c.x, 560, { size: 90, weight: 700, align: 'center' }); ctx.restore(); }
      if (k <= 0) return;
      E.layer(ctx, k * (active === -1 || active === i ? 1 : 0.55), cc => {
        INK.label(cc, c.name, c.x - 40, 250, { size: 62, weight: 700, align: 'center' });
        DAMLA.draw(cc, { x: c.x + 150, y: 300, s: 0.5, view: 'front', expr: 'neutral', blink: E.blink(t, 7 + i), t, seed: 3 + i, state: c.st, shadow: false });
        const bx = c.x - 210, by = 340, bw = 420, bh = 380;
        const R = F.box(cc, bx, by, bw, bh, { lid: c.kind === 'gas', seed: 170 + i });
        if (c.kind === 'liquid') F.water(cc, bx, by, bw, bh, 150, { alpha: 0.28, seed: 171 });
        if (c.kind === 'solid') F.field(cc, 'solid', [bx + 50, by + bh - 210, bw - 100, 200], t, { r: 18, cols: 8, rows: 5 });
        else if (c.kind === 'liquid') F.field(cc, 'liquid', [R[0], R[1] + R[3] - 150, R[2], 150], t, { r: 18, rows: 4 });
        else F.field(cc, 'gas', R, t, { r: 18, n: 9 });
        if (c.kind === 'solid') { cc.save(); cc.globalAlpha = 0.5; INK.dashed(cc, F.rectPts(bx + 42, by + bh - 214, bx + bw - 42, by + bh - 4), { w: 2, on: 8, off: 6 }); cc.restore(); }
        P.write(cc, c.mot, c.x, 790, E.seg(t, s0 + 1.2, s0 + 2.4), { size: 38, align: 'center', color: PAL.water });
        P.write(cc, c.gap, c.x, 850, E.seg(t, s0 + 2.2, s0 + 3.4), { size: 36, align: 'center', alpha: 0.8 });
      });
    });
    // akışkanlık rozetleri
    const kf = E.se(t, sf + 0.8, sf + 1.6, 'out');
    if (kf > 0) COLS.forEach((c, i) => {
      const flow = i > 0; const x = c.x, y = 420;
      ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(kf), P.pop(kf)); ctx.rotate(-0.04);
      F.card(ctx, 0, 0, 290, 76, { seed: 180 + i, fill: flow ? '#E4EEF2' : '#F3E6DE', shadow: false, color: flow ? PAL.water : '#A23A2A' });
      INK.label(ctx, flow ? 'akışkan ✓' : 'akışkan değil', 0, 14, { size: 40, weight: 700, align: 'center', color: flow ? PAL.water : '#A23A2A' });
      ctx.restore();
    });
  }
  E.scene({
    name: 'Katı, sıvı, gaz', concept: 'Tanecik düzeni, boşluk ve hareket; akışkanlık', from: 'states', to: 'flow', trFrom: [960, 600],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(46,106,140,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const a = E.se(t, E.s('solid') - 0.5, E.s('solid') + 0.3);
      if (a < 1) E.layer(ctx, 1 - a, c => intro(c, t));
      if (a > 0) E.layer(ctx, a, c => columns(c, t));
    }
  });
})();
