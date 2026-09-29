// SAHNE 2 — Hatırla (hâl değişiminde tanecikler arası mesafe) → soru (hâl değişmezse?) → önerme (a) → gözleme dayalı olan/olmayan önermeler (b)
(function () {
  const { PAL, line, stroke, circlePts, wash, rng, dashed } = INK;
  const F = G15;
  function looseField(ctx, cx, cy, w, h, t, n, r, seed) { // sıvı benzeri gevşek dizilim
    const R = rng(seed);
    for (let i = 0; i < n; i++) { const x = cx - w / 2 + r + R() * (w - 2 * r), y = cy - h / 2 + r + R() * (h - 2 * r); F.particle(ctx, x + Math.sin(t * 3 + i) * 5, y + Math.cos(t * 2.6 + i * 1.3) * 5, r); }
  }
  function row(ctx, x, y, txt, ok, k) {
    if (k <= 0) return;
    const box = [[x, y - 36], [x + 44, y - 38], [x + 46, y + 6], [x + 2, y + 8], [x, y - 36]];
    stroke(ctx, box, { w: 2.4, closed: true, seed: 2210 + (y | 0) });
    if (ok) P.check(ctx, x + 20, y - 16, 42, E.seg(k, 0.4, 1), { w: 6 });
    else P.cross(ctx, x + 23, y - 15, 15, E.seg(k, 0.4, 1), { w: 5, color: F.RED });
    P.write(ctx, txt, x + 66, y, E.seg(k, 0, 0.6), { size: 38 });
  }
  E.scene({
    name: 'Önerme', concept: 'Önerme oluşturma; gözleme dayalı olan ve olmayan önermeler', from: 'why', to: 'compare', trFrom: [960, 300],
    draw(ctx, t) {
      const sw = E.s('why'), sc = E.s('claim'), sp = E.s('compare');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 90, 1620, 810);
      // --- HATIRLA (why) ---
      const ka = 1 - E.se(t, sc - 0.2, sc + 0.4);
      if (ka > 0) E.layer(ctx, ka, c => {
        P.write(c, 'Hatırla:', 290, 215, E.seg(t, sw + 0.2, sw + 1.0), { size: 50, color: F.AMBER });
        P.write(c, 'hâl değişince tanecikler arası mesafe değişir', 490, 215, E.seg(t, sw + 0.8, sw + 2.6), { size: 44 });
        const b1 = E.se(t, sw + 0.8, sw + 1.6, 'out'), b2 = E.se(t, sw + 2.0, sw + 2.8, 'out'), b3 = E.se(t, sw + 4.2, sw + 5.0, 'out');
        const boxes = [[450, 'katı', b1], [900, 'sıvı', b2], [1400, 'hâl değişmezse?', b3]];
        boxes.forEach(([x, lab, k], i) => {
          if (k <= 0) return;
          c.save(); c.globalAlpha *= k;
          c.save(); c.globalAlpha *= 0.8; dashed(c, F.rectPts(x - 150, 340, x + 150, 620, 30), { w: 2.4, on: 12, off: 9, color: PAL.water }); c.restore();
          if (i === 1) looseField(c, x, 480, 300, 280, t, 10, 20, 2220);
          else F.lattice(c, x, 480, 4, 4, 20, 50 + (i === 2 ? 3 * Math.sin(t * 2) + 3 : 0), i === 2 ? 3 : 2, 1, t);
          INK.label(c, lab, x, 680, { size: 42, weight: 700, align: 'center', color: i === 2 ? F.AMBER : PAL.ink });
          c.restore();
        });
        if (b2 > 0) { P.arrow(c, [615, 480], [735, 480], b2, { w: 4, color: F.HEAT, head: 16 }); INK.label(c, 'ısı', 675, 450, { size: 36, weight: 700, color: F.HEAT, align: 'center', alpha: b2 }); }
        if (b3 > 0) { INK.label(c, '?', 1400, 390, { size: 90, weight: 700, color: F.AMBER, align: 'center', alpha: b3 * 0.9 }); INK.label(c, 'ısı alıyor, hâl değişmiyor', 1400, 740, { size: 34, align: 'center', color: F.HEAT, alpha: b3 }); }
      });
      // --- ÖNERME (claim → compare boyunca kalır) ---
      if (t > sc) {
        P.write(ctx, 'Önermem:', 290, 215, E.seg(t, sc + 0.3, sc + 1.1), { size: 50, color: F.AMBER });
        P.write(ctx, 'Isı alan madde genleşir, ısı veren madde büzülür.', 520, 215, E.seg(t, sc + 1.0, sc + 3.4), { size: 46 });
        if (t > sc + 3.4) P.drawOn(ctx, P.bez([520, 236], [900, 246], [1400, 232], 30), E.se(t, sc + 3.4, sc + 4.0), { w: 3, color: PAL.light });
      }
      const kb = E.se(t, sc + 2.0, sc + 2.8) * (1 - E.se(t, sp - 0.2, sp + 0.4));
      if (kb > 0) E.layer(ctx, kb, c => {
        // genleşme: kutu büyür
        const g = E.se(t, sc + 3.0, sc + 5.0), s = E.se(t, sc + 4.4, sc + 6.4);
        const gx = 560, sx = 1200, cy = 530;
        const gw = 130 + 40 * g, sw2 = 170 - 40 * s;
        P.fillPts(c, F.rectPts(gx - gw, cy - gw * 0.8, gx + gw, cy + gw * 0.8, 4), F.HEAT, 0.12);
        stroke(c, F.rectPts(gx - gw, cy - gw * 0.8, gx + gw, cy + gw * 0.8, 6), { w: 3, closed: true, seed: 2231, color: F.HEAT });
        F.lattice(c, gx, cy, 3, 3, 18, 60 + 22 * g, 2 + 2 * g, 1 + g, t);
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { if (g > 0.1) P.arrow(c, [gx + dx * (gw + 12), cy + dy * (gw * 0.8 + 12)], [gx + dx * (gw + 52), cy + dy * (gw * 0.8 + 52)], E.seg(g, 0.1, 0.9), { w: 3.4, color: F.HEAT, head: 12 }); });
        P.fillPts(c, F.rectPts(sx - sw2, cy - sw2 * 0.8, sx + sw2, cy + sw2 * 0.8, 4), F.COLD, 0.15);
        stroke(c, F.rectPts(sx - sw2, cy - sw2 * 0.8, sx + sw2, cy + sw2 * 0.8, 6), { w: 3, closed: true, seed: 2232, color: PAL.water });
        F.lattice(c, sx, cy, 3, 3, 18, 82 - 22 * s, 3 - 1.5 * s, 1.6 - 0.8 * s, t);
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { if (s > 0.1) P.arrow(c, [sx + dx * (sw2 + 60), sy(cy, dy, sw2, 60)], [sx + dx * (sw2 + 16), sy(cy, dy, sw2, 16)], E.seg(s, 0.1, 0.9), { w: 3.4, color: PAL.water, head: 12 }); });
        INK.label(c, 'genleşme: hacim artar', gx, 790, { size: 40, weight: 700, color: F.AMBER, align: 'center', alpha: E.seg(g, 0.5, 1) });
        INK.label(c, 'büzülme: hacim azalır', sx, 790, { size: 40, weight: 700, color: PAL.water, align: 'center', alpha: E.seg(s, 0.5, 1) });
        INK.label(c, 'Hacim: maddenin boşlukta kapladığı yer', 880, 860, { size: 34, align: 'center', alpha: 0.75 * E.se(t, sc + 6.4, sc + 7.2) });
      });
      function sy(cy, dy, w, off) { return cy + dy * (w * 0.8 + off); }
      // --- KARŞILAŞTIRMA (compare) ---
      const cols = [
        { x: 270, at: sp + 0.3, head: 'Duyduğum bir söz', quote: '“Sıcakta her şey büyür.”', ok: false, rows: ['ölçüm', 'karşılaştırma', 'tekrar'], foot: 'gözleme dayalı değil' },
        { x: 1010, at: sp + 3.2, head: 'Gözleme dayalı', quote: '“Sıcak sudaki balon şişti.”', ok: true, rows: ['ölçüm', 'karşılaştırma', 'tekrar'], foot: 'test edilebilir' }
      ];
      cols.forEach((cd, i) => {
        const k = E.se(t, cd.at, cd.at + 0.7, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(cd.x + 320, 600); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-(cd.x + 320), -600);
        F.card(ctx, cd.x, 320, 640, 560, { seed: 2240 + i, fill: i ? '#FBF6E8' : '#F6F2EA' });
        INK.label(ctx, cd.head, cd.x + 320, 385, { size: 46, weight: 700, align: 'center', color: i ? F.AMBER : PAL.ink });
        ctx.restore();
        if (k < 1) return;
        const b = cd.at + 0.6;
        P.write(ctx, cd.quote, cd.x + 320, 465, E.seg(t, b, b + 1.0), { size: 40, align: 'center', weight: 400 });
        if (i === 1) { const bb = E.se(t, b + 0.4, b + 1.4); if (bb > 0) E.layer(ctx, bb, c => F.bottleBalloon(c, cd.x + 510, 800, 0.62, 0.9, t)); }
        cd.rows.forEach((w, j) => row(ctx, cd.x + 70, 580 + j * 80, w, cd.ok, E.seg(t, b + 0.8 + j * 0.5, b + 1.6 + j * 0.5)));
        const fk = E.se(t, b + 2.4, b + 3.0);
        if (fk > 0) INK.label(ctx, cd.foot, cd.x + 320, 850, { size: 40, weight: 700, align: 'center', color: i ? PAL.water : '#7a6f62', alpha: fk });
      });
      // Damla sağ kenarda
      const pk = E.se(t, sw + 0.1, sw + 0.9, 'out');
      DAMLA.draw(ctx, {
        x: 1760, y: 1060 + (1 - pk) * 300, s: 0.95, view: 'q3', flip: true, t, seed: 2, blink: E.blink(t, 6), squash: E.breath(t), talk: E.talk(t),
        expr: t > sp ? 'determined' : (t > sc ? 'happy' : 'thinking'), look: [-0.7, -0.4],
        arms: t > sc + 1 && t < sp ? [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.08]] : [[-1, 0.35], [1, 0.4]]
      });
    }
  });
})();
