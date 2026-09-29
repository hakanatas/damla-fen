// SAHNE 4 — Aile ağacı: ortak ata, alelin kuşaklar boyunca aktarımı; mantıksal temellendirme (FB.8.3.6 a)
(function () {
  const { PAL, stroke, line, circlePts, wobble } = INK;
  const F = F808;
  // kişiler: [x, ayakY, genotip, seed, rol]
  const G1 = [[700, 360, 'Aa', 21, 'büyükbaba'], [900, 360, 'AA', 22, 'büyükanne']];
  const G2 = [[470, 610, 'Aa', 23, ''], [290, 610, 'AA', 24, ''], [1130, 610, 'Aa', 25, ''], [1310, 610, 'AA', 26, '']];
  const G3 = [[380, 850, 'Aa', 27, 'kuzen'], [1220, 850, 'Aa', 28, 'kuzen']];
  const S = 0.72;
  const hline = (c, a, b, k) => P.drawOn(c, [a, b], k, { w: 2.6, dry: false });
  E.scene({
    name: 'Aile ağacı', concept: 'Ortak ata; olasılık', from: 'ancestor', to: 'likely', trFrom: [800, 300],
    draw(ctx, t) {
      const sa = E.s('ancestor'), ss = E.s('spread'), sl = E.s('likely');
      F.warmBg(ctx);
      // bağ çizgileri
      const k1 = E.se(t, sa + 0.5, sa + 1.5), k2 = E.se(t, ss + 0.2, ss + 1.4), k3 = E.se(t, ss + 2.4, ss + 3.6);
      ctx.save(); ctx.globalAlpha *= 0.8;
      hline(ctx, [736, 300], [864, 300], k1);                         // evlilik çizgisi
      if (k2 > 0) { P.drawOn(ctx, [[800, 300], [800, 420], [470, 420], [470, 470]], k2, { w: 2.6, dry: false }); P.drawOn(ctx, [[800, 420], [1130, 420], [1130, 470]], k2, { w: 2.6, dry: false }); hline(ctx, [326, 550], [434, 550], k2); hline(ctx, [1166, 550], [1274, 550], k2); }
      if (k3 > 0) { P.drawOn(ctx, [[380, 550], [380, 720]], k3, { w: 2.6, dry: false }); P.drawOn(ctx, [[1220, 550], [1220, 720]], k3, { w: 2.6, dry: false }); }
      ctx.restore();
      const draw = (arr, t0, dt) => arr.forEach(([x, y, g, sd, rol], i) => {
        const k = E.se(t, t0 + i * dt, t0 + i * dt + 0.6, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => { F.person(c, x, y, S, g, { seed: sd }); if (rol) F.fit(c, rol, x, y + 40, 220, 36, { weight: 700 }); });
      });
      draw(G1, sa + 0.2, 0.4);
      draw(G2, ss + 0.8, 0.25);
      draw(G3, ss + 3.0, 0.3);
      // "a" alelinin yolu (parlayan iz)
      const pk = E.se(t, ss + 4.2, ss + 6.4);
      if (pk > 0) {
        const pathL = P.bez([715, 310], [560, 420], [485, 560], 20).concat(P.bez([485, 560], [420, 700], [395, 800], 20));
        const pathR = P.bez([715, 310], [1000, 420], [1145, 560], 20).concat(P.bez([1145, 560], [1200, 700], [1235, 800], 20));
        [pathL, pathR].forEach((pth, i) => { ctx.save(); ctx.globalAlpha *= 0.85; INK.dashed(ctx, F.dense(P.partial(pth, pk)), { on: 10, off: 8, w: 4, color: F.AMB }); ctx.restore(); });
      }
      // kuzenler: aynı alel
      const ck = E.se(t, sl + 0.4, sl + 1.2);
      if (ck > 0) {
        ctx.save(); ctx.globalAlpha *= ck;
        [[380, 850], [1220, 850]].forEach(([x, y], i) => stroke(ctx, wobble(circlePts(x + 15, y - 50, 52, 36, 30), 2, 3700 + i), { w: 3.4, closed: true, color: F.AMB }));
        ctx.restore();
      }
      // karşılaştırma kartı
      const rk = E.se(t, sl + 1.4, sl + 2.2, 'out');
      if (rk > 0) E.layer(ctx, rk, c => {
        F.card(c, 1450, 200, 400, 520, 3710);
        F.wfit(c, 'Akrabalar', 1650, 270, E.seg(t, sl + 1.6, sl + 2.4), 46, 360, { align: 'center', color: F.AMB });
        F.wfit(c, 'ortak atalardan', 1650, 330, E.seg(t, sl + 2.0, sl + 2.8), 40, 360, { align: 'center' });
        F.wfit(c, 'gen alır.', 1650, 380, E.seg(t, sl + 2.3, sl + 3.1), 40, 360, { align: 'center' });
        if (t > sl + 3.2) P.arrow(c, [1650, 405], [1650, 470], E.se(t, sl + 3.2, sl + 3.7), { w: 3 });
        F.wfit(c, 'Aynı çekinik aleli', 1650, 530, E.seg(t, sl + 3.7, sl + 4.5), 38, 360, { align: 'center' });
        F.wfit(c, 'taşıma olasılığı', 1650, 580, E.seg(t, sl + 4.1, sl + 4.9), 38, 360, { align: 'center' });
        F.wfit(c, 'daha yüksek', 1650, 650, E.seg(t, sl + 4.5, sl + 5.3), 50, 360, { align: 'center', color: F.AMB });
      });
      F.damla(ctx, t, { x: 1700, y: 900, s: 0.75, flip: true, expr: t > sl ? 'determined' : 'curious', look: [-0.8, -0.3], arms: [[-1, 2.0], [1, 0.4]] });
    }
  });
})();
