// SAHNE 6 — Prizmada beyaz ışık kırılarak renklerine ayrılır (programda "değinilir").
// Her renk iki yüzeyde V.refract ile izlenir. Renk ayrışması görünür olsun diye kırılma farkları abartılmıştır (ekranda belirtilir).
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F712, V = F.V;
  const AP = [960, 250], BL = [700, 700], BR = [1220, 700];
  const TRI = [AP, BR, BL, AP];
  const SRC = [330, 600], HIT = F.at(AP, BL, 0.55);
  const COLS = [['#C8413B', 1.49], ['#E07B39', 1.505], ['#D9B23A', 1.52], ['#6F9A3A', 1.535], ['#3C6FA8', 1.55], ['#6B4A9A', 1.57]];
  const inter = (p, d, a, b) => { const ex = b[0] - a[0], ey = b[1] - a[1], den = d[0] * ey - d[1] * ex; const qx = a[0] - p[0], qy = a[1] - p[1]; const tt = (qx * ey - qy * ex) / den; return [p[0] + d[0] * tt, p[1] + d[1] * tt]; };
  const outN = (a, b, c) => { let n = V.norm([-(b[1] - a[1]), b[0] - a[0]]); const m = V.mul(V.add(a, b), 0.5); if (V.dot(n, V.sub(c, m)) > 0) n = V.mul(n, -1); return n; }; // dışa bakan normal
  const D0 = V.norm(V.sub(HIT, SRC));
  const nL = outN(AP, BL, BR), nR = outN(AP, BR, BL);
  const PATHS = COLS.map(([col, n]) => {
    const d1 = V.refract(D0, nL, 1.0, n);
    const X = inter(HIT, d1, AP, BR);
    const d2 = V.refract(d1, V.mul(nR, -1), n, 1.0);
    return { col, X, END: V.add(X, V.mul(d2, 560)) };
  });

  E.scene({
    name: 'Prizma', concept: 'Beyaz ışığın renklerine ayrılması', from: 'prism', to: 'prism', trFrom: [960, 480],
    draw(ctx, t) {
      const sp = E.s('prism');
      ctx.fillStyle = 'rgba(24,25,40,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      P.fillPts(ctx, TRI, '#E3EDF0', 0.9); wash(ctx, TRI, '#7FA3B3', 0.3, 601, { bleed: 1.5, blooms: 1 }); stroke(ctx, TRI, { w: 3.4, closed: true, seed: 602, color: '#4E6A78' });
      INK.label(ctx, 'prizma', 960, 760, { size: 40, weight: 700, align: 'center', color: '#4E6A78' });
      F.lightbox(ctx, SRC[0], SRC[1], Math.atan2(D0[1], D0[0]), 0.8);
      const k1 = E.se(t, sp + 0.8, sp + 2.0);
      if (k1 > 0) { const e = F.at(SRC, HIT, k1);
        line(ctx, SRC, e, { w: 12, color: '#FFFBEF', dry: false, taper: 0.02 });
        line(ctx, SRC, e, { w: 2, color: PAL.ink, dry: false, alpha: 0.5, taper: 0.02 }); }
      E.inkText(ctx, 'beyaz ışık', 470, 540, t, sp + 1.2, 1e9, { size: 40, align: 'center' });
      const k2 = E.se(t, sp + 2.0, sp + 3.0), k3 = E.se(t, sp + 3.0, sp + 4.6);
      PATHS.forEach((p, i) => {
        if (k2 > 0) line(ctx, HIT, F.at(HIT, p.X, k2), { w: 2.6, color: p.col, dry: false, alpha: 0.85, seed: 610 + i, taper: 0.02 });
        if (k3 > 0) line(ctx, p.X, F.at(p.X, p.END, k3), { w: 5, color: p.col, dry: false, seed: 620 + i, taper: 0.02 });
      });
      if (k3 >= 1) {
        INK.label(ctx, 'kırmızı', PATHS[0].END[0] + 14, PATHS[0].END[1] + 6, { size: 34, weight: 700, color: PATHS[0].col, alpha: E.se(t, sp + 4.6, sp + 5.2) });
        INK.label(ctx, 'mor', PATHS[5].END[0] + 14, PATHS[5].END[1] + 14, { size: 34, weight: 700, color: PATHS[5].col, alpha: E.se(t, sp + 4.6, sp + 5.2) });
      }
      INK.label(ctx, '(renklerin ayrılması görünsün diye abartılı çizilmiştir)', 1860, 900, { size: 26, align: 'right', alpha: 0.55 });
      DAMLA.draw(ctx, { x: 330, y: 890, s: 0.9, view: 'q3', expr: t > sp + 4.6 ? 'happy' : 'curious', look: [0.9, -0.3], blink: E.blink(t, 29), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: t > sp + 4.6 ? [[-1, 2.6], [1, 2.6]] : [[-1, 0.35], [1, 0.35]] });
    }
  });
})();
